import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import { Converter } from "showdown";
import "survey-react/survey.css";
import "../style.css";
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant,editParticipantGermany } from "../../actions";
import SurveyFinalPage from "./SurveyFinalPage";

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
// Survey
//   .StylesManager
//   .applyTheme("default");
const json = {
  // progressBarType: "buttons",
  // showProgressBar: "top",
  title: {
    default: "Details",
    fa: "<nazlifont>" + "اطلاعات اولیه" + "</nazlifont>",
  },
  // showProgressBar: "bottom",
  // showTimerPanel: "bottom",
  // maxTimeToFinishPage: 20,
  // maxTimeToFinish: 10,
  // timeToAnswer: 0,
  // firstPageIsStarted: true,
  logoPosition: "right",
  pages: [
    {
      name: "taskConsentAgreement",
      elements: [
        {
          type: "radiogroup",
          name: "taskConsentAgreement",
          title:
            "<nazlifont>" +
            "- شرکت شما در این پژوهش کمک بزرگی در راستای توسعه علم خواهد کرد." +
            "<br />" +
            "- شرکت در این پژوهش کاملا داوطلبانه است و اجباری برای شرکت در این پژوهش نیست." +
            "<br />" +
            "- حتی پس از موافقت با شرکت در پژوهش، هر زمان که بخواهید، می توانید از سیستم خارج شوید." +
            "<br />" +
            "- این پژوهش هیچ گونه آسیبی در پی نخواهد داشت." +
            "<br />" +
            "- اطلاعات شما در این پژوهش به صورت محرمانه نگه داشته خواهد شد و فقط نتایج کلی گزارش می شود." +
            "<br />" +
            "- در صورت بروز مشکل می توانید با مسئول پژوهش، آقای محمد رسول پارسائيان با شماره تلفن ۰۹۳۶۵۱۵۶۸۳۰ تماس حاصل نمایید." +
            "</nazlifont>",
          choices: [
            "<nazlifont>" +
              " اینجانب موارد فوق الذکر را خواندم و براساس آن رضایت آگاهانه خود را برای شرکت در این پژوهش اعلام می کنم." +
              "</nazlifont>",
          ],
          isRequired: true,
          requiredErrorText:
            "<nazlifont>" +
            "ادامه آزمایش نیاز به علامت زدن گزینه زیر و تایید شما دارد." +
            "</nazlifont>",
        },
      ],
    },
  ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  // questionsOnPageMode: "questionPerPage",
  // showTimerPanel: "top",
  completeText: "بعدی",
  showTitle: false,
  // cookieName: "informationprivacycoockie11",
  // pageNextText:  "<nazlifont>" + "تایید" + "</nazlifont>",
  pageNextText: "تایید",
};
class GlobalConsent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  componentDidMount() {
   // this.props.fetchParticipantPII(this.props.match.params.id);
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
      participantprofile: { ...survey.data },
      submittime: dateTime,
    };
    this.props.editParticipant(this.props.match.params.id, {
      demographic: { ...survey.data },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      demographic: { ...survey.data },
    });
  }
  render() {
    var model = new Survey.Model(json);
    model.showQuestionNumbers = "off";
    // model.showPrevButton = false; // ^ Uncomment to disable back button
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
        applyTheme="defaul"
      />
    ) : null;
    var onCompleteComponent = this.state.isCompleted ? (
      <SurveyFinalPage nextPage={`${this.props.nextPage}${this.getUserId()}`} />
    ) : null;
    return (
      <div className="container">
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    participant: state.participant,
  };
};
export default connect(mapStateToProps, { editParticipant,editParticipantGermany })(
  withRouter(GlobalConsent)
);
