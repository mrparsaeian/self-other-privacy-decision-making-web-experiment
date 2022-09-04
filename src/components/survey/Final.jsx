import React from "react";
// import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Converter } from "showdown";
import { Link, withRouter } from "react-router-dom";
// import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant ,editParticipantGermany} from "../../actions";
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
const firstCommonLineforQuestions =
  // "  فرض کنید می‌توانید به داده‌های زیر دسترسی پیدا کنید." +
  // " بین" +
  // minMaxTextTitile +
  "گزینه ‌ای که بیشترین مطابق با شما دارد را، انتخاب کنید." + markdownNewline;
const isRequiredForAllQuestions = false;
const likertChoicesForDTriad = [
  "کاملا موافقم",
  "نسبتا موافقم",
  "نه موافقم و نه مخالف ",
  "نسبتا مخالفم",
  "کاملا مخالفم",
];
const auctionQuestionsUnshuffled = [
  {
    type: "radiogroup",
    name: "ReceiveOtherResultsRequest",
    title:
      "<nazlifont>" +
      " اگر یک شرکت کننده جدید را معرفی کرده باشید، آیا تمایل دارید تا  " +
      "<green>" +
      "نتایج فردی و اختصاصی آن شرکت کننده (شامل نمره او در پرسشنامه ها) " +
      "</green>" +
      "را دریافت کنید؟" +
      markdownNewline +
      "</nazlifont>",
    choices: ["بله", "خیر"],
    isRequired: isRequiredForAllQuestions,
    requiredErrorText: "پایان آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
  },
  {
    type: "radiogroup",
    name: "ReceiveTotalResultsRequest",
    title:
      "<nazlifont>" +
      " آیا تمایل دارید  " +
      "<green>" +
      "نتایج کلی پژوهش" +
      "</green>" +
      " را دریافت کنید؟" +
      markdownNewline +
      "</nazlifont>",
    choices: ["بله", "خیر"],
    isRequired: isRequiredForAllQuestions,
    requiredErrorText: "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
  },
  {
    type: "radiogroup",
    name: "ReceiveSelfResultsRequest",
    title:
      "<nazlifont>" +
      "آیا تمایل دارید " +
      "<green>" +
      "نتایج فردی و اختصاصی شما (شامل نمره شما در پرسشنامه ها)" +
      "</green>" +
      " را دریافت کنید؟" +
      markdownNewline +
      "</nazlifont>",
    choices: ["بله", "خیر"],
    isRequired: isRequiredForAllQuestions,
    requiredErrorText: "پایان آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
  },
];
//  Shuffle the questions
// const auctionQuestionsShuffled = auctionQuestionsUnshuffled
//   .map((value) => ({ value, sort: Math.random() }))
//   .sort((a, b) => a.sort - b.sort)
//   .map(({ value }) => value);
const auctionQuestionsShuffled =
  Math.random() > 0.5
    ? auctionQuestionsUnshuffled
    : auctionQuestionsUnshuffled.slice().reverse();
const json = {
  pages: [
    {
      name: "FinalReceiveResultsAgreement",
      elements: [
        ...auctionQuestionsShuffled,
        {
          type: "html",
          name: "FinishAgreementText",
          title:"",
          html:
            "<p>" +
            "<nazlifont>" +
            "<red>" +
            "لطفا برای پایان پژوهش و ثبت داده‌ها، حتما دکمه زیر را بزنید." +
            markdownNewline +
            // // "<underlinemarkdown>" +
            // // "</underlinemarkdown>" +
            "</red>" +
            "</nazlifont>" +
            "</p>",
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
  completeText: "پایان و ثبت",
  pageNextText: "پایان و ثبت",
};

class Final extends React.Component {
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
      finalinforequestsdata: {
        ...survey.data,
        QuestionsOrder: [
          auctionQuestionsShuffled[0].name,
          auctionQuestionsShuffled[1].name,
          auctionQuestionsShuffled[2].name,
        ],
        submittime: dateTime,
      },
    };
    this.props.editParticipant(this.props.match.params.id, {
      finalinforequests: { ...survey.data },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      finalinforequests: { ...survey.data },
    });
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
    var onCompleteComponent = this.state.isCompleted ? (
      <div className="card">
        <p className="font-face-nazli">
          با تشکر فراوان برای شرکت شما در این آزمایش
        </p>
        <p className="font-face-nazli">خدانگهدار </p>
      </div>
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
  return { participant: state.participant };
};

export default connect(mapStateToProps, { editParticipant,editParticipantGermany })(
  withRouter(Final)
);
