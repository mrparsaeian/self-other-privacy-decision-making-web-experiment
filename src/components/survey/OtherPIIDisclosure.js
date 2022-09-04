import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import { Converter } from "showdown";
import "../style.css";

import "survey-react/survey.css";
// import Inputmask from 'inputmask';
// import 'inputmask/dist/inputmask/phone-codes/phone';
// import * as widgets from 'surveyjs-widgets';
// import "jquery.inputmask"
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant, editParticipantGermany } from "../../actions";
import SurveyFinalPage from "./SurveyFinalPage";
import history from "../../history";

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
const otherPIIDisClosuresUnshuffled = [
  {
    name: "otherPIIDisClosureSurvey",
    elements: [
      {
        type: "multipletext",
        name: "otherPIIDisClosureMultiText",
        title: {
          default: "Please enter your mobile phone number and email address.",
          fa: "لطفا جهت کمک به افزایش شرکت کنندگان و کسب نتایج علمی غنی‌تر، یکی از دوستان خود را به عنوان شرکت کننده جدید، معرفی کنید.",
        },
        items: [
          {
            // type: "nouislider",
            // type: "text",
            name: "otherName",
            title: {
              default: "Name",
              fa: "نام شرکت کننده جدید",
            },
            // validators: [
            //   {
            //     type: "text",
            //     minValue: this.minValuation,
            //     maxValue: this.maxValuation,
            //   },
            // ],
          },
          {
            name: "otherFamilyName",
            title: {
              default: "Family Name",
              fa: "نام خانوادگی شرکت کننده جدید",
            },
          },
          {
            name: "otherPhoneNumber",
            title: {
              fa: "شماره موبایل شرکت کننده جدید",
              default: "Mobile number",
            },
          },
          {
            name: "otherEmailAddress",
            title: {
              default: "Email address",
              fa: "ایمیل شرکت کننده جدید",
            },
            validators: [
              {
                type: "email",
                text: "لطفا آدرس ایمیل را اصلاح کنید.",
              },
            ],
          },
          {
            name: "otherTelegramID",
            title: {
              default: "Telegram ID",
              fa: "آی دی تلگرام شرکت کننده جدید",
            },
          },
        ],
      },
    ],
  },
];
const otherPIIDisclosureShuffled = otherPIIDisClosuresUnshuffled;
// .map((value) => ({ value, sort: Math.random() }))
// .sort((a, b) => a.sort - b.sort)
// .map(({ value }) => value);
const json = {
  pages: [...otherPIIDisclosureShuffled],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  completeText: "تایید",
  pageNextText: "تایید",
};
class OtherPIIDisClosure extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }
  // componentWillMount() {
  // Survey.Survey.cssType = "bootstrap";
  // Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
  //   widgets.inputmask(Survey);
  // }

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
      otherPIIDisClosureData: { ...survey.data },
      submittime: dateTime,
    };
    this.props.editParticipant(this.props.match.params.id, {
      otherPIIDisClosure: { ...survey.data },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      otherPIIDisClosure: { ...survey.data },
    });
    history.push(this.props.nextPage + this.getUserId());
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
        applyTheme="default"
      />
    ) : null;
    // var onCompleteComponent = this.state.isCompleted ? (
    //   <SurveyFinalPage nextPage={`${this.props.nextPage}${this.getUserId()}`} />
    // ) : null;
    var onCompleteComponent = null;
    return <div className="container">{surveyRender}
      {onCompleteComponent}</div>;
  }
}

const mapStateToProps = (state) => {
  return { participant: state.participant };
};

export default connect(mapStateToProps, { editParticipant, editParticipantGermany })(
  withRouter(OtherPIIDisClosure)
);
