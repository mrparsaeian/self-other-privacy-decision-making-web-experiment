import React from "react";
// import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Converter } from "showdown";
import { Link, withRouter } from "react-router-dom";
// import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant, editParticipantGermany } from "../../actions";
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
    type: "text",
    name: "selfEmailAddressFromFinalPage",
    title: {
      default: "",
      fa: "به پاس قدر دانی از زحمات شما، " +
        "می‌توانیم  هدف‌هایی که در" +
        " این پژوهش در پی محقق کردن آنهاهستیم و نظریه‌های پس زمینه آن" +
        " را برای شما ایمیل کنیم." +
        markdownNewline +
        "این ایمیل ظرف چند ماه آینده و پس از به سر انجام رسیدن آزمایش و انتشار نتایج، ارسال خواهد شد." +
        markdownNewline +
        "در صورتی‌که برنده جایزه بخش حدس زدن شوید نیز، از طریق ایمیلی که در این قسمت وارد کرده‌اید مطلع خواهید شد." +
        markdownNewline +
        "لطفا آدرس ایمیل خود را مجددا وارد نمایید: "

    },
    validators: [
      {
        type: "email",
        text: "لطفا آدرس ایمیل را اصلاح کنید.",
      },
    ],
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
          title: "",
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
      Final: {
        ...survey.data
      },
      submittime: dateTime,
      timestampsforoptionchange: survey.timestampsoptions,
    }
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
    model.onUpdateQuestionCssClasses.add(function (survey, options) {
      var classes = options.cssClasses;
      classes.mainRoot += " sv_qstn2";
      classes.root = "sq-root";
      classes.title += " sq-title";
      // classes.footer = "sv_qstn2";

      // console.dir(classes);
      // if (options.question.isRequired) {
      //   classes.title += " sq-title-required";
      //   classes.root += " sq-root-required";
      // }
      if (options.question.getType() === "checkbox") {
        classes.root += " sq-root-cb";
      }
    });
    function timerCallback() {
      var page = model.currentPage;
      if (!page) return;
      var valueName = "submittime" + page;
      var seconds = model.getValue(valueName);
      if (seconds == null) seconds = 0;
      else seconds++;
      model.setValue(valueName, seconds);
    }
    if (!model.timestampsoptions) {
      model.timestampsoptions = {};
    }
    model.onAfterRenderPage.add(function (sender, options) {
      if (options.page !== undefined && options.page !== null) {
        sender.timestampsoptions[options.page.name] = {};
        console.log("start");
        sender.timestampsoptions[options.page.name] = {
          ...sender.timestampsoptions[options.page.name],
          start: Date.now(),
        };
        console.log("pageisstarted:", options.page.name);
      }
      console.log("changesrenderpage", options.page);
    });
    model.onAfterRenderSurvey.add(function (sender, options) {
      if (sender.pages[0]) {
        // if (sender.timestampsoptions[sender.pages[0].name] === undefined) {
        //   sender.timestampsoptions[sender.pages[0].name] = {};
        // }

        console.log(
          "startsurvey",
          sender.pages[0].name,
          sender.timestampsoptions[sender.pages[0].name]
        );
        sender.timestampsoptions[sender.pages[0].name] = {
          ...sender.timestampsoptions[sender.pages[0].name],
          startsurvey: Date.now(),
        };
        console.log(
          "surveypageisstarted:",
          sender.timestampsoptions[sender.pages[0].name]
        );
      }
      console.log("changessurvey", sender.pages[0]);
    });
    model.onCurrentPageChanged.add(function (sender, options) {
      if (
        options.oldCurrentPage !== undefined &&
        options.oldCurrentPage !== null
      ) {
        console.log("options.oldCurrentPage.name", options.oldCurrentPage.name);

        // if (sender.timestampsoptions[options.oldCurrentPage.name]) {
        //   sender.timestampsoptions[options.oldCurrentPage.name] = {};
        // }

        console.log("end");
        sender.timestampsoptions[options.oldCurrentPage.name] = {
          ...sender.timestampsoptions[options.oldCurrentPage.name],
          end: Date.now(),
        };
        console.log("pageisended:", options.oldCurrentPage.name);
      }
      console.log("changespageend", options.oldCurrentPage);
      timerCallback();
    });
    model.onComplete.add(function (sender, options) {
      if (sender.pages[sender.pages.length - 1]) {
        // sender.timestampsoptions[sender.pages[sender.pages.length - 1].name] =
        // sender.timestampsoptions[sender.pages[sender.pages.length - 1].name]
        //   ? {
        //       ...sender.timestampsoptions[
        //         sender.pages[sender.pages.length - 1].name
        //       ],
        //     }
        //   : {};

        console.log("endsurvey");
        sender.timestampsoptions[sender.pages[sender.pages.length - 1].name] = {
          ...sender.timestampsoptions[
          sender.pages[sender.pages.length - 1].name
          ],
          end: Date.now(),
        };
        console.log(
          "pageisendedcompletes survey:",
          sender.pages[sender.pages.length - 1].name
        );
      }
      console.log(
        "changescompletesurvey",
        sender.pages[sender.pages.length - 1]
      );
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
        <p
          style={{
            font: "1.5rem NazliRegular",
            align: "center",
            "backgroundColor": "#179d82", /* Green */
            border: "none",
            color: "white",
            // padding: "auto auto",
            /* textAlign: center, */
            "textDecoration": "none",
            /* display: inline-block, */
            "fontSize": "2rem",
            "borderRadius": "0.2rem",
            /* display: block, */
            margin: "0px auto",
            "marginRight": "auto",
            /* width: 40%, */
            /* width: 25%, */
            /* padding: 1em 0, */
            /* min-height: 2em, */
            /* color: white, */
            /* backgroundColor: #1ab394, */
            /* float: left, */
            "marginBottom": "auto",
            width: "8rem",
            height: "3.5rem",
            "textAlign": "center",
            cursor: "pointer"
          }}>به امید دیدار </p>
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
  return {};

};

export default connect(mapStateToProps, { editParticipant, editParticipantGermany })(
  withRouter(Final)
);
