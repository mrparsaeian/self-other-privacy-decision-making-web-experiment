import { createUser, editParticipant, editParticipantGermany, createUserGermany } from "../../actions";
import history from "../../history";
import React from "react";

import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Converter } from "showdown";
import { withRouter } from "react-router-dom";
// import _ from "lodash";
import { connect } from "react-redux";
import "../style.css";
Survey.JsonObject.metaData.addProperty("itemvalue", { name: "score:number" });
Survey.matrixDropdownColumnTypes.rating = {
  properties: ["rateValues"],
};

const rtlLanguages = ["fa"];
function setPageDirection(language) {
  const dir = rtlLanguages.includes(language) ? "rtl" : "ltr";
  document.documentElement.dir = dir;
}
setPageDirection("fa"); // rtl
// setPageDirection("en"); // rtl

const markdownNewline = "<br />";
const isRequiredForAllQuestions = false;

const json = {
  pages: [
    {
      name: "FinalReceiveResultsAgreement",
      elements: [
        {
          type: "html",
          name: "LandingAgreementText",
          title: ``,
          html: `<p className="font-face-nazli">خوش آمدید.</p>
          <p className="font-face-nazli">این پژوهش به عنوان پایان نامه ارشد رشته علوم شناختی
           دانشکده روانشناسی دانشگاه تهران 
          و با حمایت دانشکده برق و کامپیوتر انجام می‌شود.</p>
          <p className="font-face-nazli">
          لطفا تا پایان آزمایش در همین صفحه بمانید و از باز کردن اَپ(برنامه) یا وبسایت دیگر، خودداری فرمایید. 
          </p>
           <p className="font-face-nazli">
            لطفا برای شروع آزمایش، دکمه زیر را بزنید:
          </p>`,
          choices: ["مایل هستم."],
          isRequired: isRequiredForAllQuestions,
          requiredErrorText:
            "پایان آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
        },
      ],
    },
  ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  completeText: "شروع آزمایش",
  pageNextText: "شروع آزمایش",
  logoPosition: "right",
  logo: "https://www.ponya.ir/logo128.png",
  logoWidth: 60,
  logoHeight: 60,
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
    this.userID =
      "U" + Date.now() + "-" + Math.floor(Math.random() * 8919 + 5080);
    this.participantObj = { [this.userID]: { id: this.userID } };
    this.props.createUser(this.userID);
    this.props.createUserGermany(this.userID);
    this.handleFullScreenClickChild.bind(this);
  }
  handleFullScreenClickChild = () => {
    this.props.handleFullScreenInParent();
  };
  componentDidMount() {
    //disables hthe back button
    window.dispatchEvent(new CustomEvent("navigationhandler"));
  }
  getUserId() {
    const { id } = this.props.match.params;
    return id;
  }
  onCompleteComponent(survey, options) {
    this.setState({ isCompleted: true });
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    survey.data = {
      LandingPageData: {
        ...survey.data,
        // QuestionsOrder: [
        //   auctionQuestionsShuffled[0].name,
        //   auctionQuestionsShuffled[1].name,
        //   auctionQuestionsShuffled[2].name,
        // ],
        submittime: dateTime,
      },
    };
    this.props.editParticipant(this.userID, {
      LandingPage: { ...survey.data },
    });
    this.props.editParticipantGermany(this.userID, {
      LandingPage: { ...survey.data },
    });
    // console.log(this.props.nextPage + this.getUserId());
    // this.handleFullScreenClickChild();
    history.push(`${this.props.nextPage}${this.userID}`);
  }
  render() {
    var model = new Survey.Model(json);
    model.showQuestionNumbers = "off";
    model.showPrevButton = false; // ^ Uncomment to disable back button
    var converter = new Converter();
    model.onTextMarkdown.add(function (survey, options) {
      // convert the markdown text to html
      var str = converter.makeHtml(options.text);
      // remove root paragraphs <p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      // set html
      options.html = str;
    });
    function timerCallback() {
      var page = model.currentPage;
      if (!page) return;
      // var valueName = "submittime" + model.pages.indexOf(page);
      var valueName = "submittime" + page;
      var seconds = model.getValue(valueName);
      if (seconds == null) seconds = 0;
      else seconds++;
      model.setValue(valueName, seconds);
    }

    model.onCurrentPageChanged.add(function () {
      timerCallback();
    });
    timerCallback();
    this.timerId = window.setInterval(function () {
      timerCallback();
    }, 1000);

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        locale={"fa"}
        model={model}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
        onCurrentPageChanged={timerCallback()}
        // onUpdateQuestionCssClasses={this.onUpdateQuestionCssClasses}
        applyTheme="default"
      />
    ) : null;
    // var onCompleteComponent = this.state.isCompleted ? (
    //   // <div className="ui raised card">
    //   <div className="card">
    //     <p className="font-face-nazli">
    //       با تشکر فراوان برای شرکت شما در این آزمایش
    //     </p>
    //     <p className="font-face-nazli">خدانگهدار </p>
    //   </div>
    // ) : null;
    return <div className="container">{surveyRender}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    participant: state.participant,
  };
};

export default connect(mapStateToProps, {
  editParticipant,
  createUser,
  createUserGermany,
  editParticipantGermany
})(withRouter(Landing));
// export default withRouter(FullScreen);
