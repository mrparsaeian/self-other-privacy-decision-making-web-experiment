import React from "react";
// import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { Converter } from "showdown";
import { Link, withRouter } from "react-router-dom";
// import _ from "lodash";
import { connect } from "react-redux";
import { fetchParticipantPII, editParticipant, editParticipantGermany } from "../../actions";
import "../style.css";
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
const likertChoicesForDTriad = [
  "کاملا موافقم",
  "نسبتا موافقم",
  "نه موافقم و نه مخالف ",
  "نسبتا مخالفم",
  "کاملا مخالفم",
];

const InterventionDescription = {};
InterventionDescription.SocietalBenefitGroup01 = {}
InterventionDescription.ScientificDataBenefitGroup02 = {}
InterventionDescription.IndividualisticDataBenefit03 = {}
InterventionDescription.CuriosityDataBenefit04 = {}

InterventionDescription.SocietalBenefitGroup01.Choices = [
  {
    value: "YesWantToGet",
    text: {
      default: "",
      fa: "بله",
    },
  },
  {
    value: "NoDontWantToGetSocietalBenefit",
    text: {
      default: "",
      fa: "خیر",
    },
  }
]
InterventionDescription.ScientificDataBenefitGroup02.Choices = [
  {
    value: "YesWantToGet",
    text: {
      default: "",
      fa: "بله",
    },
  },
  {
    value: "NoDontWantToGetScientificResultsData",
    text: {
      default: "",
      fa: "خیر",
    },
  }
]
InterventionDescription.IndividualisticDataBenefit03.Choices = [
  {
    value: "YesWantToGet",
    text: {
      default: "",
      fa: "بله",
    },
  },
  {
    value: "NoDontWantToGetSelfData",
    text: {
      default: "",
      fa: "خیر",
    },
  }
]
InterventionDescription.CuriosityDataBenefit04.Choices = [
  {
    value: "YesWantToGet",
    text: {
      default: "",
      fa: "بله",
    },
  },
  {
    value: "NoDontWantToGetOtherData",
    text: {
      default: "",
      fa: "خیر",
    },
  }
]

InterventionDescription.SocietalBenefitGroup01.Text = " آیا تمایل دارید به" +
  "<green>" +
  " انجام بهتر این آزمایش" +
  "</green>" +
  " برای" +
  "<green>" +
  " کسب نتایج علمی مفید‌تر" +
  "</green>" +
  " کمک کنید؟"
InterventionDescription.ScientificDataBenefitGroup02.Text = " آیا تمایل دارید  " +
  "<green>" +
  "نتایج علمی نهایی این پژوهش" +
  "</green>" +
  " را دریافت کنید؟"
InterventionDescription.IndividualisticDataBenefit03.Text = " آیا تمایل دارید  " +
  "<green>" +
  "داده‌های خام و نتایج آزمایش مربوط به خودتان " +
  "</green>" +
  " را دریافت کنید؟"
InterventionDescription.CuriosityDataBenefit04.Text = " آیا تمایل دارید  " +
  "<green>" +
  "داده‌های خام و نتایج آزمایش مربوط به شرکت کننده جدیدی که معرفی می کنید" +
  "</green>" +
  " را دریافت کنید؟"
const RandomizeGroups = (a, b) => (Math.random() > 0.5 ? a : b);
const InterventionGroupName = RandomizeGroups(
  RandomizeGroups("SocietalBenefitGroup01", "ScientificDataBenefitGroup02"),
  RandomizeGroups("IndividualisticDataBenefit03", "CuriosityDataBenefit04")
)

const Intervention =
  [
    {
      type: "radiogroup",
      name: "ReceiveOtherResultsRequest",
      title:
        InterventionDescription[InterventionGroupName].Text,
      choices: InterventionDescription[InterventionGroupName].Choices,
      isRequired: isRequiredForAllQuestions,
      requiredErrorText: "لطفا یکی از گزینه‌ها را انتخاب کنید.",
    },
    {
      type: "multipletext",
      name: "SelfANDOtherPIIInformation",
      title: {
        default: "",
        fa: "لطفا جهت کمک به کسب نتایج علمی غنی‌تر، مشخصات خود را وارد کنید.",
      },
      "enableIf": "{ReceiveOtherResultsRequest}='YesWantToGet'",
      items: [
        {

          name: "selfNameRevised",
          title: {
            default: "",
            fa: "<nazlifont>" + "نام" + "</nazlifont>",
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
          name: "selfFamilyNameRevised",
          title: {
            default: "Family Name",
            fa: "<nazlifont>" + "نام خانوادگی" + "</nazlifont>",
          },
        },
        {
          name: "selfPhoneNumberRevised",
          title: {
            fa: "شماره موبایل",
            default: "Mobile number",
          },
        },
        {
          name: "selfEmailAddressRevised",
          title: {
            default: "Email address",
            fa: "ایمیل",
          },
          validators: [
            {
              type: "email",
              text: "لطفا آدرس ایمیل را اصلاح کنید.",
            },
          ],
        },
        {
          name: "selfTelegramIDRevised",
          title: {
            default: "Telegram ID",
            fa: "آی دی تلگرام",
          },
        },
      ],
    }, {
      type: "multipletext",
      name: "SelfANDOtherPIIInformationOther",
      title: {
        default: "Please enter your mobile phone number and email address.",
        fa: "لطفا جهت کمک به افزایش شرکت کنندگان و کسب نتایج علمی غنی‌تر، یکی از دوستان خود را به عنوان شرکت کننده جدید، معرفی کنید.",
      },
      "enableIf": "{ReceiveOtherResultsRequest}='YesWantToGet'",
      items: [
        {
          // type: "nouislider",
          // type: "text",
          name: "otherNameRevised",
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
          name: "otherFamilynameRevised",
          title: {
            default: "Family Name",
            fa: "نام خانوادگی شرکت کننده جدید:",
          },
        },
        {
          name: "otherPhoneNumberRevised",
          title: {
            fa: "شماره موبایل شرکت کننده جدید:",
            default: "Mobile number",
          },
        },
        {
          name: "otherEmailAddressRevised",
          title: {
            default: "Email address",
            fa: "ایمیل شرکت کننده جدید:",
          },
          validators: [
            {
              type: "email",
              text: "لطفا آدرس ایمیل را اصلاح کنید.",
            },
          ],
        },
        {
          name: "otherTelegramIDRevised",
          title: {
            default: "Telegram ID",
            fa: "آی دی تلگرام شرکت کننده جدید:",
          },
        },
      ],
    },
  ];


const json = {
  pages: [
    {
      name: "FinalReceiveResultsAgreement",
      elements: [
        ...Intervention,
        // {
        //   type: "html",
        //   name: "FinishAgreementText",
        //   title: "",
        //   html:
        //     "<p>" +
        //     "<nazlifont>" +
        //     "<red>" +
        //     "لطفا در حدود ۱۰ دقیق زمان برای انجام مراحل بعدی در نظر بگیرید" +
        //     markdownNewline +
        //     // // "<underlinemarkdown>" +
        //     // // "</underlinemarkdown>" +
        //     "</red>" +
        //     "</nazlifont>" +
        //     "</p>" +
        //     "<p>" +
        //     "<nazlifont>" +
        //     "<red>" +
        //     "ترجیها در این مدت در فضایی آرام بنشینید و از انجام فعالیت‌های دیگر خودداری فرمایید. " +
        //     markdownNewline +
        //     // // "<underlinemarkdown>" +
        //     // // "</underlinemarkdown>" +
        //     "</red>" +
        //     "</nazlifont>" +
        //     "</p>",
        //   choices: ["مایل هستم."],
        //   isRequired: isRequiredForAllQuestions,
        //   requiredErrorText:
        //     "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
        // },
      ],
    },
  ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  completeText: "شروع",
  pageNextText: "شروع",
};

class Assessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };
    this.state = { participantFromAPI: { isAPILoaded: false } };

    this.state = {
      participantFromAPI:
      {
        participantFromAPI:
        {
          selfPIIDisclosure:
          {
            selfPIIDisclosureData:
            {
              selfPIIDisclosureMultiText:
                { selfName: "" }
            }
          }
        }
      }
    };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
    this.props.fetchParticipantPII(this.props.match.params.id);
  }
  componentDidMount() {
    // this.props.fetchParticipantPII(this.props.match.params.id);
    //disables hthe back button
    // setInterval(() => { console.log(this.state.participantFromAPI.isAPILoaded) }, 2000)
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
      Assessment: {
        ...survey.data,
        ExperimentGroup: [
          InterventionGroupName
        ],
        submittime: dateTime,
      },
    };
    this.props.editParticipant(this.props.match.params.id, {
      Assessment: { ...survey.data },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      Assessment: { ...survey.data },
    });
    history.push(this.props.nextPage + this.getUserId());
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
    const timerCallback = () => {
      var page = model.currentPage;
      if (!page) return;
      // var valueName = "submittime" + model.pages.indexOf(page);
      var valueName = "submittime" + page;
      var seconds = model.getValue(valueName);
      if (seconds == null) seconds = 0;
      else seconds++;
      model.setValue(valueName, seconds);
    }

    model.onCurrentPageChanged.add(() => {
      timerCallback();
    });
    timerCallback();
    this.timerId = window.setInterval(() => {
      timerCallback();
    }, 1000);

    // console.log("LOGG1:", this.state.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName)
    // console.log("LOGG1:", this.state.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName)
    // console.log("LOGG1:", this.props.participantFromAPI.participantFromAPI)
    // console.log("LOGG2:", model)

    model.onAfterRenderQuestion.add((sender, options) => {
      // console.log(this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName)
      console.log(this.props.participantFromAPI)
      sender.data = {
        SelfANDOtherPIIInformation: {
          // selfNameRevised: this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.
          //   selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName,
          selfNameRevised: this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.
            selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName,
          // selfNameRevised: "Testor",
          //     // ****************************************************************************************
              selfFamilyNameRevised: this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.
                selfPIIDisclosureData.selfPIIDisclosureMultiText.selfFamilyName,
          //     // ****************************************************************************************
              selfPhoneNumberRevised: this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.
                selfPIIDisclosureData.selfPIIDisclosureMultiText.selfPhoneNumber,
          //     // ****************************************************************************************
              selfEmailAddressRevised: this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.
                selfPIIDisclosureData.selfPIIDisclosureMultiText.selfEmailAddress,
          //     // ****************************************************************************************
              selfTelegramIDRevised: this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.
                selfPIIDisclosureData.selfPIIDisclosureMultiText.selfTelegramID,
          //     // ****************************************************************************************
          },
          SelfANDOtherPIIInformationOther: {
            otherNameRevised: this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.
              otherPIIDisClosureData.otherPIIDisClosureMultiText.otherName,
          //   // ****************************************************************************************
            otherFamilynameRevised: this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.
              otherPIIDisClosureData.otherPIIDisClosureMultiText.otherFamilyName,
          //   // ****************************************************************************************
            otherPhoneNumberRevised: this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.
              otherPIIDisClosureData.otherPIIDisClosureMultiText.otherPhoneNumber,
          //   // ****************************************************************************************
            otherEmailAddressRevised: this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.
              otherPIIDisClosureData.otherPIIDisClosureMultiText.otherEmailAddress,
          //   // ****************************************************************************************
            otherTelegramIDRevised: this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.
              otherPIIDisClosureData.otherPIIDisClosureMultiText.otherTelegramID,
          //   // ****************************************************************************************
          // selfNameRevised: "test"
        }
      }

      // if (sender.pages[0]) {
      // if (sender.timestampsoptions[sender.pages[0].name] === undefined) {
      //   sender.timestampsoptions[sender.pages[0].name] = {};
      // }

      // console.log(
      //   "startsurvey",
      //   sender.pages[0].name,
      //   sender.timestampsoptions[sender.pages[0].name]
      // );
      // sender.timestampsoptions[sender.pages[0].name] = {
      //   ...sender.timestampsoptions[sender.pages[0].name],
      //   startsurvey: Date.now(),
      // };
      // console.log(
      //   "surveypageisstarted:",
      //   sender.timestampsoptions[sender.pages[0].name]
      // );
    }
      // console.log("changessurvey", sender.pages[0]);
      // }
    );
    // var surveyRender = !this.state.isCompleted ? (
    var surveyRender = this.state.participantFromAPI.participantFromAPI ? (
      <Survey.Survey
        locale={"fa"}
        model={model}
        showCompletedPage={false}
        // onValueChanged={this.surveyValueChanged}
        onComplete={this.onCompleteComponent}
        onCurrentPageChanged={timerCallback()}
        // onUpdateQuestionCssClasses={this.onUpdateQuestionCssClasses}
        applyTheme="default"
      />
    ) : null;
    var onCompleteComponent = null;
    // var onCompleteComponent = this.state.isCompleted ? (
    //   <div className="card">
    //     <p className="font-face-nazli">
    //       با تشکر فراوان برای شرکت شما در این آزمایش
    //     </p>
    //     <p className="font-face-nazli">خدانگهدار </p>
    //   </div>
    // ) : null;
    return (
      <div className="container" >
        {surveyRender}
        {onCompleteComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    participantFromAPI: state.participant,
    isAPILoaded: state.isAPILoaded
  };
};

export default connect(mapStateToProps, { fetchParticipantPII, editParticipant, editParticipantGermany })(
  withRouter(Assessment)
);
