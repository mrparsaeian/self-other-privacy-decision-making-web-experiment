import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
// import Inputmask from 'inputmask';
// import 'inputmask/dist/inputmask/phone-codes/phone';
// import * as widgets from 'surveyjs-widgets';
// import "jquery.inputmask"
import { Converter } from "showdown";
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
  componentWillMount() {
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
    // widgets.nouislider(Survey);
  }
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
  firstCommonLineforQuestions =
    // "  فرض کنید می‌توانید به داده‌های زیر دسترسی پیدا کنید." +
    // " بین" +
    // this.minMaxTextTitile +
    "گزینه ‌ای که بیشترین مطابق با شما دارد را، انتخاب کنید." + "<br />";
  isRequiredForAllQuestions = false;
  likertChoicesForDTriad = [
    "کاملا موافقم",
    "نسبتا موافقم",
    "نه موافقم و نه مخالف ",
    "نسبتا مخالفم",
    "کاملا مخالفم",
  ];
  auctionQuestionsUnshuffled = [
    {
      name: "DTriad01Mac01", //#1
      elements: [
        {
          type: "radiogroup",
          name: "DTriad01Mac01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دوست دارم برای رسیدن به اهدافم،‌دیگران را تحت نفوذ خودم درآورم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            " دوست دارم برای رسیدن به اهدافم از فریب یا دروغ استفاده کنم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم برای رسیدن به اهدافم، در مقابل دیگران چرب‌زبانی کنم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست درام برای رسیدن به اهدافم، از دیگران سوء استفاده کنم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم(در اشتباهات ام) احساس پشیمانی نداشته باشم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم بیش از حد نگران اخلاقیات یا رعایت اصول اخلاقی اعمالم نباشم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم نسبت به دیگران سنگدل و بی‌عاطفه باشم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم نسبت به دیگران عیب‌جو و بدبین باشم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم از دیگران بخواهم که مرا تحسین کنند." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم از دیگران بخواهم که به من توجه کنند." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم به دنبال شأن و مقام اجتماعی باشم." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
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
            this.firstCommonLineforQuestions +
            "دوست دارم از دیگران انتظار داشته باشم که توجه ویژه‌ای به من کنند." +
            "</nazlifont>",
          choices: this.likertChoicesForDTriad,
          isRequired: this.isRequiredForAllQuestions,
        },
      ],
    },
  ];
  //  Shuffle the questions
  auctionQuestionsShuffled = this.auctionQuestionsUnshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  json = {
    pages: [
      {
        name: "auctionDesc",
        elements: [
          {
            type: "radiogroup",
            name: "AuctionsAgreement",
            title:
              "<nazlifont>" +
              "در این بخش ۱۲ سوال ۵ گزینه‌ای برای شما نمایش داده می‌شود. " +
              "<br />" +
              " لطفا " +
              "<green>" +
              "<underlinemarkdown>" +
              " با دقت" +
              "</underlinemarkdown>" +
              "</green>" +
              " به آن‌ها پاسخ بدهید." +
              // "<br />" +
              "</nazlifont>",
            choices: ["آماده انجام این بخش هستم."],
            isRequired: this.isRequiredForAllQuestions,
          },
        ],
      },
      ...this.auctionQuestionsShuffled,
    ],
    widthMode: "responsive",
    questionTitlePattern: "Title",
    requiredText: "",
  };
  render() {
    var model = new Survey.Model(this.json);
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
