import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
// import Inputmask from 'inputmask';
// import 'inputmask/dist/inputmask/phone-codes/phone';
// import * as widgets from 'surveyjs-widgets';
// import "jquery.inputmask"
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchParticipant, editParticipant } from "../../actions";

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

class SPINSurvey extends React.Component {
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
    this.props.fetchParticipant(this.props.match.params.id);
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
  }
  json = {
    title: {
      default: "Triad",
      fa: "سه گانه",
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
        name: "totalqualityoflifepage",
        elements: [
          {
            type: "radiogroup",
            name: "totalqualityoflifequestion",
            title: {
              default: "How would you rate your quality of life?",
              fa: "من با بازی دادن آدم ها راحت هستم.",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very poor",
                  fa: "خیلی بد",
                },
              },
              {
                value: "2",
                text: {
                  default: "Poor",
                  fa: "بد",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither poor nor good",
                  fa: "نه بد و نه خوب",
                },
              },
              {
                value: "4",
                text: {
                  default: "Good",
                  fa: "خوب",
                },
              },
              {
                value: "5",
                text: {
                  default: "Very good",
                  fa: "خیلی خوب",
                },
              },
            ],
          },
        ],
        description: {
          default:
            "Please choose the answer that appears most appropriate. If you are unsure about which response to give to a question, the first response you think of is often the best one.Please keep in mind your standards, hopes, pleasures and concerns. We ask that you think about your life in the last four weeks.",
          fa: "به این سوالات سه گانه پاسخ دهید",
        },
      },
    ],
    // cookieName: "informationprivacycoockie11",
  };

  render() {
    var model = new Survey.Model(this.json);
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
      <div className="ui container">
        {/* <div> */}
        <p>در بخش بعدی شما با یک از شرکت‌کنندگان دیگر وارد یک بازی می‌شوید.</p>
        <p>لطفا برای شروع بخش بعدی آزمایش دکمه زیر را بزنید:</p>

        {/* <p>
          برای آگاهی از نتایج آزمایش پیشین و همینطور نمره خود در این پرسشنامه
          دکمه زیر را بزنید.
        </p> */}
        <Link to={`/ontoterg/${this.getUserId()}`} className="ui button">
          شروع
        </Link>
      </div>
    ) : null;
    return (
      <div className="ui container">
        {/* <div> */}
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { participant: state.participant };
};

export default connect(mapStateToProps, { fetchParticipant, editParticipant })(
  SPINSurvey
);
