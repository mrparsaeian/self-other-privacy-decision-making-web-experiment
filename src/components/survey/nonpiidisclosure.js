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

class DemographicAndQualityOfLife extends React.Component {
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
      default: "Details",
      fa: "?????????? ???????? ?????? ????????",
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
        name: "namesexagepage",
        elements: [
          {
            type: "multipletext",
            name: "nonpii-01",
            title: {
              default: "Average Score",
              fa: "???????? ??????",
            },
            items: [
              {
                name: "sirname",
                title: {
                  default: "average",
                  fa: "????????",
                },
              }
            ],
          },
          {
            type: "radiogroup",
            name: "sexuality",
            title: {
              default: "Sex",
              fa: "??????????",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Female",
                  fa: "????????",
                },
              },
              {
                value: "2",
                text: {
                  default: "Male",
                  fa: "????????",
                },
              },
            ],
          },
          {
            type: "dropdown",
            name: "age",
            title: {
              default: "Age",
              fa: "????",
            },
            choices: [
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
            ],
          },
        ],
      }
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
        <p>???????? ???? ?????????????? ???? ???? ?????????? ???? ?????? ???????????? ???????? ?????? ???? ???????????? ?????? ???????????? ?????? ???? ??????. </p>
        <p>
         ???????? ???????? ???????? ?????? ???????? ???????????? ???????? ?????? ???? ??????????:
        </p>

        {/* <p>
          ???????? ?????????? ???? ?????????? ???????????? ?????????? ?? ?????????????? ???????? ?????? ???? ?????? ????????????????
          ???????? ?????? ???? ??????????.
        </p> */}
        <Link to={`/pdscls/${this.getUserId()}`} className="ui button">
          
          ????????
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
  DemographicAndQualityOfLife
);
