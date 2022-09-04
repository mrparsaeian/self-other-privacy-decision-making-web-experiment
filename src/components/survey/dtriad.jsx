import React from "react";
// import ReactDOM from "react-dom";
import * as Survey from "survey-react";
// import "survey-react/survey.css";
import { Converter } from "showdown";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant ,editParticipantGermany} from "../../actions";
import SurveyFinalPage from "./SurveyFinalPage";
import "../style.css";
// numbers instead of names
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
  {
    value: "4",
    text: {
      default: "",
      fa: "<nazlifont>" + "کاملا موافقم" + "</nazlifont>",
    },
  },
  {
    value: "3",
    text: {
      default: "",
      fa: "<nazlifont>" + "نسبتا موافقم" + "</nazlifont>",
    },
  },
  {
    value: "2",
    text: {
      default: "",
      fa: "<nazlifont>" + "نه موافقم و نه مخالف" + "</nazlifont>",
    },
  },
  {
    value: "1",
    text: {
      default: "",
      fa: "<nazlifont>" + "نسبتا مخالفم" + "</nazlifont>",
    },
  },
  {
    value: "0",
    text: {
      default: "",
      fa: "<nazlifont>" + "کاملا مخالفم" + "</nazlifont>",
    },
  },
];
const auctionQuestionsUnshuffled = [
  {
    name: "DTriad01Mac01", //#1
    elements: [
      {
        type: "radiogroup",
        name: "DTriad01Mac01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم برای رسیدن به اهدافم،‌دیگران را تحت نفوذ خودم درآورم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad02Mac02", //#2
    elements: [
      {
        type: "radiogroup",
        name: "DTriad02Mac02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          " دوست دارم برای رسیدن به اهدافم از فریب یا دروغ استفاده کنم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad03Mac03", //#3
    elements: [
      {
        type: "radiogroup",
        name: "DTriad03Mac03",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم برای رسیدن به اهدافم، در مقابل دیگران چرب‌زبانی کنم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad04Mac04", //#4
    elements: [
      {
        type: "radiogroup",
        name: "DTriad04Mac04",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم برای رسیدن به اهدافم، از دیگران سوء استفاده کنم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad05Psy01", //#5
    elements: [
      {
        type: "radiogroup",
        name: "DTriad05Psy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم(در اشتباهات ام) احساس پشیمانی نداشته باشم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad06Psy02", //#6
    elements: [
      {
        type: "radiogroup",
        name: "DTriad06Psy02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم بیش از حد نگران اخلاقیات یا رعایت اصول اخلاقی اعمالم نباشم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad07Psy03", //#7
    elements: [
      {
        type: "radiogroup",
        name: "DTriad07Psy03",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم نسبت به دیگران سنگدل و بی‌عاطفه باشم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad08Psy04", //#8
    elements: [
      {
        type: "radiogroup",
        name: "DTriad08Psy04",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم نسبت به دیگران عیب‌جو و بدبین باشم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad09Nars01", //#9
    elements: [
      {
        type: "radiogroup",
        name: "DTriad09Nars01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم از دیگران بخواهم که مرا تحسین کنند." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad10Nars02", //#10
    elements: [
      {
        type: "radiogroup",
        name: "DTriad10Nars02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم از دیگران بخواهم که به من توجه کنند." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad11Nars03", //#11
    elements: [
      {
        type: "radiogroup",
        name: "DTriad11Nars03",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم به دنبال شأن و مقام اجتماعی باشم." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "DTriad12Nars04", //#12
    elements: [
      {
        type: "radiogroup",
        name: "DTriad12Nars04",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions +
          "دوست دارم از دیگران انتظار داشته باشم که توجه ویژه‌ای به من کنند." +
          "</nazlifont>",
        choices: likertChoicesForDTriad,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
];
//  Shuffle the questions
const RandomizeGroups = (a, b) => (Math.random() > 0.5 ? a : b);

const auctionQuestionsShuffled = RandomizeGroups(
  ["Unreversed", auctionQuestionsUnshuffled],
  ["Reversed", [...auctionQuestionsUnshuffled].reverse()]
);
const json = {
  pages: [
    {
      name: "dtriadDesc",
      elements: [
        {
          type: "radiogroup",
          name: "AuctionsAgreement",
          title:
            "<nazlifont>" +
            "در این بخش ۱۲ سوال ۵ گزینه‌ای برای شما نمایش داده می‌شود. " +
            markdownNewline +
            " لطفا " +
            "<green>" +
            // "<underlinemarkdown>" +
            " با دقت" +
            // "</underlinemarkdown>" +
            "</green>" +
            " به آن‌ها پاسخ بدهید." +
            // markdownNewline +
            "</nazlifont>",
          choices: ["آماده انجام این بخش هستم."],
          isRequired: true,
          requiredErrorText:
            "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
        },
      ],
    },
    ...auctionQuestionsShuffled[1],
  ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  completeText: "تایید",
  pageNextText: "تایید",
};

class DarkTriad extends React.Component {
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
    console.log(survey.data);
    survey.data = {
      darktriadsurvey: { ...survey.data },
      QuestionsOrder: [
        ...auctionQuestionsShuffled[1].map((guest, index) => {
          return guest.name;
        }),
      ],
      isReversed: auctionQuestionsShuffled[0],
      submittime: dateTime,
      timestampsforoptionchange: survey.timestampsoptions,
    };
    this.props.editParticipant(this.props.match.params.id, {
      darktriad: { ...survey.data },
    });
    this.props.editParticipantGermany(this.userID, {
      darktriad: { ...survey.data },
    });
    // history.push(`${this.props.nextPage}${this.getUserId()}`);
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
      // var valueName = "submittime" + model.pages.indexOf(page);
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
        // console.log("start");
        sender.timestampsoptions[options.page.name] = {
          ...sender.timestampsoptions[options.page.name],
          start: Date.now(),
        };
        // console.log("pageisstarted:", options.page.name);
      }
      // console.log("changesrenderpage", options.page);
    });
    model.onAfterRenderSurvey.add(function (sender, options) {
      if (sender.pages[0]) {
        // if (sender.timestampsoptions[sender.pages[0].name] === undefined) {
        //   sender.timestampsoptions[sender.pages[0].name] = {};
        // }

        // console.log(
        //   "startsurvey",
        //   sender.pages[0].name,
        //   sender.timestampsoptions[sender.pages[0].name]
        // );
        sender.timestampsoptions[sender.pages[0].name] = {
          ...sender.timestampsoptions[sender.pages[0].name],
          startsurvey: Date.now(),
        };
        // console.log(
        //   "surveypageisstarted:",
        //   sender.timestampsoptions[sender.pages[0].name]
        // );
      }
      // console.log("changessurvey", sender.pages[0]);
    });
    model.onCurrentPageChanged.add(function (sender, options) {
      if (
        options.oldCurrentPage !== undefined &&
        options.oldCurrentPage !== null
      ) {
        // console.log("options.oldCurrentPage.name", options.oldCurrentPage.name);

        // if (sender.timestampsoptions[options.oldCurrentPage.name]) {
        //   sender.timestampsoptions[options.oldCurrentPage.name] = {};
        // }

        // console.log("end");
        sender.timestampsoptions[options.oldCurrentPage.name] = {
          ...sender.timestampsoptions[options.oldCurrentPage.name],
          end: Date.now(),
        };
        // console.log(
        //   "pageisended:  options.oldCurrentPage.namefor timing",
        //   options.oldCurrentPage.name
        // );
      }
      // console.log(
      //   "changespageend options.oldCurrentPage for timing",
      //   options.oldCurrentPage
      // );
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

        // console.log("endsurvey");
        sender.timestampsoptions[sender.pages[sender.pages.length - 1].name] = {
          ...sender.timestampsoptions[
            sender.pages[sender.pages.length - 1].name
          ],
          end: Date.now(),
        };
        // console.log(
        //   "pageisendedcompletes survey:",
        //   sender.pages[sender.pages.length - 1].name
        // );
      }
      // console.log(
      //   "changescompletesurvey",
      //   sender.pages[sender.pages.length - 1]
      // );
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
      this.props.nextPage["urlBeforeUserID"] ? (
        <SurveyFinalPage
          nextPage={this.props.nextPage["urlBeforeUserID"]}
          userIDThisPage={this.getUserId()}
          urlAfterUserIDthis={this.props.nextPage["urlAfterUserIDthis"]}
        />
      ) : (
        <SurveyFinalPage
          nextPage={this.props.nextPage}
          userIDThisPage={this.getUserId()}
          urlAfterUserIDthis={""}
        />
      )
    ) : null;
    return (
      <div className="container">
        {surveyRender}
        {onCompleteComponent}
        {/* </div>   */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { participant: state.participant };
};

export default connect(mapStateToProps, { editParticipant,editParticipantGermany })(
  withRouter(DarkTriad)
);
