import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "../style.css";
import { Converter } from "showdown";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editParticipant, editParticipantGermany } from "../../actions";
import SurveyFinalPage from "./SurveyFinalPage";

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
const makeColorfullMarkdown = (text, color) => {
  return `<${color}>${text}</${color}>`;
};
const markdownNewline = "<br />";
const firstCommonLineforQuestions = "";

const requiredErrorText =
  "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.";
// markdownNewline +
const NumberOfQuestions = " ۶ ";
const isRequiredForAllQuestions = true;
const StartingDoubleQoute = "«";
const EndingDoubleQoute = "»";
const AppNameForPrivacyEvaluation = " واتساپ ";
const TPBQuestionnaireDescTitle =
  " در این بخش" +
  NumberOfQuestions +
  " سوال درباره یک" +
  StartingDoubleQoute +
  "<green>" +
  " برنامه موبایل" +
  "</green>" +
  EndingDoubleQoute +
  "، برای شما نمایش داده می‌شود." +
  markdownNewline +
  " لطفا گزینه‌ای که" +
  "<green>" +
  " انطباق بیشتری" +
  "</green>" +
  " با شما دارد را، انتخاب کنید.";
var TPB = {};
const appDescription = {
  meta: `
مدیر عامل شرکت
 ${StartingDoubleQoute}
 متا 
 ${EndingDoubleQoute}
 آقای مارک زاکربرگ است.
 این شرکت
 <green> 
 مالک
 </green>
   برنامه‌های
 ${StartingDoubleQoute}
 <green>
 واتساپ
 </green>
 ${EndingDoubleQoute}
 ،
 ${StartingDoubleQoute}
 <green>
 اینستاگرام
 </green>
 ${EndingDoubleQoute}
 و 
 ${StartingDoubleQoute}
 <green>
 فیسبوک
 </green>
 ${EndingDoubleQoute}
 است.
 `};
TPB = {
  ...TPB, Beliefs: {
    BehavioralBeliefStrength: {
      questionExpression: appDescription.meta +
        markdownNewline +
        StartingDoubleQoute +
        " وقتی برنامه" +
        AppNameForPrivacyEvaluation +
        " را نصب می‌کنم، از من درخواست می‌کند که" +
        " به" +
        "<green>" +
        " لیست اسامی افراد و شماره تلفن‌ آن‌ها" +
        "</green>" +
        " که در" +
        " در گوشی دارم، دسترسی داشته باشد." +
        EndingDoubleQoute +
        markdownNewline +
        " چقدر احتمال دارد که، استفاده شرکت متا و مدیر‌عاملش از این اطلاعات، باعث" +
        "<green>" +
        " آسیب‌ دیدن یا متضرر شدن" +
        "</green>" +
        " این افراد شود؟"
      , questionItems: [
        "خیلی زیاد",
        "زیاد",
        "متوسط",
        "کم",
        "خیلی کم",
      ]

    }, outcomeValuation: {
      questionExpression: `برای من، آسیبی که افراد بدین وسیله متحمل می‌شوند:`, questionItems: [
        "خیلی اهمیت دارد",
        "نسبتا اهمیت دارد",
        "نمی‌دانم",
        "زیاد اهمیت ندارد",
        "اصلا اهمیت ندارد",
      ]
    }
  }
}
TPB = {
  ...TPB, NormativeBeliefs: {
    InjunctiveNormativeBeliefsandMotivationtoComply:
    {
      SampleInjunctiveNormativeReferentDataScientists: {
        questionExpression: `
        به نظر شما کدام گزینه برای پر کردن 
        <green>
         جای خالی 
         </green>
         در جمله زیر، درست‌تر است؟
        ${markdownNewline}
        <blue>
        متخصصین علوم داده
       (Data Scientist)
       </blue>
       ،فکر می کنند که من 
       <green>
       ـــــــــ
       </green>
       به واتساپ اجازه دهم که
        به اسامی و شماره تلفن‌ افراد، که
         در گوشی دارم، دسترسی داشته باشد.`, questionItems:
          ["قطعا باید", "باید", "فرقی نمی‌کند", "نباید", "قطعا نباید"]
      },
      MotivationtoComply: {
        questionExpression: ` وقتی مساله به اشتراک گذاشتن اطلاعات خصوصی دیگران، مطرح باشد
       من می‌خواهم به حرف متخصصین علوم داده عمل کنم.`, questionItems: ["کاملا درست است", "نسبتا درست است", "نه درست است و نه نادرست", "درست نیست", "اصلا درست نیست"]
      }
    },
    DescriptiveNormativeBeliefsandIdentificationwiththeReferent: {
      SampledescriptivenormativereferentMyfriends: {
        DescriptiveNormativeBeliefStrength: {
          questionExpression: `بیشتر دوستان من اجازه دسترسی برنامه واتساپ به 
        لیست اسامی  و شماره تلفن‌‌های افراد که در
        در گوشی‌شان دارند را 
        <red>
        نمی‌دهند
        </red>
        .`, 
        questionItems: [
            "کاملا درست است",
            "نسبتا درست است",
            "نه درست است و نه نادرست",
            "درست نیست",
            "اصلا درست نیست"
          ]
        },
        IdentificationwiththeReferent: {
          questionExpression: ` وقتی مساله به اشتراک گذاشتن اطلاعات خصوصی 
        دیگران مطرح باشد، چقدر می‌خواهید 
        که  
        <green>
        مثل دوستانتان 
        </green>
        رفتار کنید؟`, questionItems: [
            "خیلی زیاد",
            "زیاد",
            "متوسط",
            "کم",
            "خیلی کم"
          ]
        }
      }
    },
  }
}
TPB = {
  ...TPB, ControlBeliefsandPowerofControlFactors: {}
}
const AttitudeQuestionItems = [
  "خیلی خوب است",
  "خوب است",
  "نه خوب است نه بد",
  "بد است",
  "خیلی بد است",
];
const SubjectiveNormQuestion =
  firstCommonLineforQuestions +
  StartingDoubleQoute +
  " به نظر من، همه دوستانم، اگر امروز برنامه" +
  AppNameForPrivacyEvaluation +
  " را دوباره نصب کنند، اجازه می دهند که" +
  " به لیست اسامی و شماره تلفن‌های‌ ذخیره" +
  " در گوشی‌شان، دسترسی داشته باشد." +
  EndingDoubleQoute +
  markdownNewline +
  " چقدر از این موضوع اطمینان دارید؟";
const SubjectiveNormQuestionItems = [
  "کاملا مطمئنم",
  "نسبتا مطمئنم",
  "نظری ندارم",
  "زیاد مطمئنم نیستم ",
  "اصلا مطمئنم نیستم ",
];
const PerceivedBehavioralControlQuestion =
  firstCommonLineforQuestions +
  StartingDoubleQoute +
  "اگر من امروز برنامه" +
  AppNameForPrivacyEvaluation +
  " را دوباره نصب کنم، اجازه دسترسی به" +
  " لیست اسامی و شماره تلفن های" +
  " ذخیره در گوشی‌ام را، خواهم داد." +
  EndingDoubleQoute +
  markdownNewline +
  " آیا توانایی جلوگیری از این دسترسی را خواهید داشت؟";
const PerceivedBehavioralControlQuestionItems = [
  "کاملا می‌توانم",
  "شاید بتوانم",
  "نمی‌دانم",
  "شاید نتوانم",
  "اصلا نمی‌توانم",
];
const IntentionQuestion =
  firstCommonLineforQuestions +
  StartingDoubleQoute +
  "من قصد دارم که اگر امروز برنامه" +
  AppNameForPrivacyEvaluation +
  " را دوباره نصب کنم و اجازه دسترسی" +
  " به لیست اسامی و شماره تلفن های" +
  " ذخیره در گوشی‌ام را، بدهم." +
  EndingDoubleQoute +
  markdownNewline +
  "چقدر از این موضوع اطمینان دارید؟";
const IntentionQuestionItems = [
  "حتما می‌دهم",
  "شاید بدهم",
  "نمی‌دانم",
  "شاید ندهم",
  "اصلا نمی‌دهم",
];
// console.log("sn", TPB["NormativeBeliefs"]
// ["DescriptiveNormativeBeliefsandIdentificationwiththeReferent"]
// ["SampledescriptivenormativereferentMyfriends"]["DescriptiveNormativeBeliefStrength"]["questionExpression"])
// ["questionExpression"])
const auctionQuestionsUnshuffled = [
  {
    name: "TPBQuestionnaire-Atteutude", //#1
    elements: [
      {
        type: "radiogroup",
        name: "TPBQuestionnaire-Attitude",
        title: "<nazlifont>" + TPB["Beliefs"]
        ["BehavioralBeliefStrength"]
        ["questionExpression"] + "</nazlifont>",
        choices: TPB["Beliefs"]
        ["BehavioralBeliefStrength"]
        ["questionItems"],
        isRequired: isRequiredForAllQuestions,
      },

      {
        type: "radiogroup",
        name: "TPBQuestionnaire-Attitude",
        title: "<nazlifont>" + TPB["Beliefs"]["outcomeValuation"]["questionExpression"] + "</nazlifont>",
        choices: TPB["Beliefs"]["outcomeValuation"]["questionItems"],
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "TPBQuestionnaire-SubjectiveNormQuestion", //#1
    elements: [
      {
        type: "radiogroup",
        name: "TPBQuestionnaire-SubjectiveNormQuestionExpert",
        title: "<nazlifont>" +
          TPB["NormativeBeliefs"]
          ["InjunctiveNormativeBeliefsandMotivationtoComply"]
          ["SampleInjunctiveNormativeReferentDataScientists"]
          ["questionExpression"] +
          "</nazlifont>",
        choices: TPB["NormativeBeliefs"]
        ["InjunctiveNormativeBeliefsandMotivationtoComply"]
        ["SampleInjunctiveNormativeReferentDataScientists"]
        ["questionItems"],
        isRequired: isRequiredForAllQuestions,
      }, {
        type: "radiogroup",
        name: "TPBQuestionnaire-SubjectiveNormQuestionContext",
        title: "<nazlifont>" +
          TPB["NormativeBeliefs"]
          ["InjunctiveNormativeBeliefsandMotivationtoComply"]
          ["MotivationtoComply"]
          ["questionExpression"] +
          "</nazlifont>",
        choices: TPB["NormativeBeliefs"]
        ["InjunctiveNormativeBeliefsandMotivationtoComply"]
        ["MotivationtoComply"]
        ["questionItems"],
        isRequired: isRequiredForAllQuestions,
      }
    ],
  },
  {
    name: "TPBQuestionnaire-SubjectiveNormQuestion", //#1
    elements: [
      {
        type: "radiogroup",
        name: "TPBQuestionnaire-SubjectiveNormQuestion",
        title:
          TPB["NormativeBeliefs"]
          ["DescriptiveNormativeBeliefsandIdentificationwiththeReferent"]
          ["SampledescriptivenormativereferentMyfriends"]
          ["DescriptiveNormativeBeliefStrength"]
          ["questionExpression"],
        choices: TPB["NormativeBeliefs"]
        ["DescriptiveNormativeBeliefsandIdentificationwiththeReferent"]
        ["SampledescriptivenormativereferentMyfriends"]
        ["DescriptiveNormativeBeliefStrength"]
        ["questionItems"],
        isRequired: isRequiredForAllQuestions,
      }, 
      {
        type: "radiogroup",
        name: "TPBQuestionnaire-IdentificationwiththeReferent",
        title:
          TPB["NormativeBeliefs"]
          ["DescriptiveNormativeBeliefsandIdentificationwiththeReferent"]
          ["SampledescriptivenormativereferentMyfriends"]
          ["IdentificationwiththeReferent"]
          ["questionExpression"],
        choices: TPB["NormativeBeliefs"]
        ["DescriptiveNormativeBeliefsandIdentificationwiththeReferent"]
        ["SampledescriptivenormativereferentMyfriends"]
        ["IdentificationwiththeReferent"]
        ["questionItems"],
        isRequired: isRequiredForAllQuestions,
      }, 
    ],
  },
  {
    name: "TPBQuestionnaire-PerceivedBehavioralControlQuestion", //#2
    elements: [
      {
        type: "radiogroup",
        name: "TPBQuestionnaire-PerceivedBehavioralControlQuestion",
        title:
          "<nazlifont>" + PerceivedBehavioralControlQuestion + "</nazlifont>",
        choices: PerceivedBehavioralControlQuestionItems,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
  {
    name: "TPBQuestionnaire-IntentionQuestion", //#3
    elements: [
      {
        type: "radiogroup",
        name: "TPBQuestionnaire-IntentionQuestion",
        title: "<nazlifont>" + IntentionQuestion + "</nazlifont>",
        choices: IntentionQuestionItems,
        isRequired: isRequiredForAllQuestions,
      },
    ],
  },
];
// var rawQuestionnaire = Object.map(TPB)(Beliefs =>
// (
//   {
//     pages:
//       [
//         {
//           name:
//             Beliefs.find("PerceivedBehavioralControlQuestion"),
//           elements: [
//             {
//               type: "radiogroup",
//               name: Beliefs.find("PerceivedBehavioralControlQuestion")
//             }
//           ]
//         }
//       ]
//   }
// )
// );
// console.log(rawQuestionnaire);
//  Shuffle the questions
const auctionQuestionsShuffled = auctionQuestionsUnshuffled;
const json = {
  pages: [
    {
      name: "StartAnnouncementAgreementText",
      elements: [
        {
          type: "html",
          name: "StartAnnouncementAgreementText",
          title: "",
          html:
            "<p>" +
            "<red>" +
            "لطفا در حدود ۱۰ دقیقه زمان برای انجام مراحل بعدی در نظر بگیرید." +
            markdownNewline +
            // // "<underlinemarkdown>" +
            // // "</underlinemarkdown>" +
            "</red>" +
            "</p>" +
            "<p>" +
            "<red>" +
            "ترجیحا در این مدت در فضایی آرام بنشینید و از انجام فعالیت‌های دیگر خودداری فرمایید. " +
            markdownNewline +
            "</red>" +

            "</p>",
          choices: ["آماده هستم."],
          isRequired: isRequiredForAllQuestions,
          requiredErrorText:
            "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
        }
      ]
    }
    ,
    {
      name: "TPBQuestionnaireDesc",
      elements: [
        {
          type: "radiogroup",
          name: "TPBQuestionnaireDesc",
          title: TPBQuestionnaireDescTitle,
          choices: ["آماده انجام این بخش هستم."],
          isRequired: true,
          requiredErrorText: requiredErrorText,
        },
      ],
    },
    ...auctionQuestionsShuffled,
  ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  completeText: "تایید",
  pageNextText: "تایید",
};

class TPBQuestionnaire extends React.Component {
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
      TPBQuestionnaireData: { ...survey.data },
      submittime: dateTime,
      timestampsforoptionchange: survey.timestampsoptions,
    };
    this.props.editParticipant(this.props.match.params.id, {
      TPBQuestionnaire: { ...survey.data },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      TPBQuestionnaire: { ...survey.data },
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
  return {};
};

export default connect(mapStateToProps, { editParticipant, editParticipantGermany })(
  withRouter(TPBQuestionnaire)
);
