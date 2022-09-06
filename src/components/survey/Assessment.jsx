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
const isRequiredForAllQuestions = true;
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

InterventionDescription.SocietalBenefitGroup01.Text = "کسی معرف شما نبوده است. آیا تمایل دارید به" +
  "<green>" +
  " انجام بهتر این آزمایش" +
  "</green>" +
  " برای" +
  "<green>" +
  " کسب نتایج علمی مفید‌تر" +
  "</green>" +
  " کمک کنید؟"
InterventionDescription.ScientificDataBenefitGroup02.Text = "کسی معرف شما نبوده است. آیا تمایل دارید  " +
  "<green>" +
  "نتایج علمی نهایی این پژوهش" +
  "</green>" +
  " را، از طریق ایمیل دریافت کنید؟"
InterventionDescription.IndividualisticDataBenefit03.Text = "کسی معرف شما نبوده است. آیا تمایل دارید  " +
  "<green>" +
  "نتایج علمی نهایی این پژوهش" +
  "</green>" +
  " و " +
  "<green>" +
  "داده‌های خام و تحلیل شده و نتایج آزمایش مربوط به"+
  "</green>" +
  "<blue>" +
  " خودتان " +
  "</blue>" +
  " را، از طریق ایمیل دریافت کنید؟"
InterventionDescription.CuriosityDataBenefit04.Text = "کسی معرف شما نبوده است. آیا تمایل دارید  " +
  "<green>" +
  "داده‌های خام و تحلیل شده و نتایج آزمایش مربوط به"+
  "<blue>" +
  " خودتان "+
  "</blue>" +
  "و "+
  "<blue>" +
  "شرکت کننده جدیدی"+
  "</blue>" +
  " که معرفی می کنید" +
  "</green>" +
  " را، از طریق ایمیل دریافت کنید؟"
const temptationeText = "در صورت انتخاب گزینه بله و بهره‌مندی  از نتایج این پژوهش، لطفا مشخصات خود و شرکت کننده جدید را تکمیل بفرمایید." +
  markdownNewline + " فرم‌های مشخصات که در زیر می‌بینید، در صورتی قابل دسترس هستند، که گزینه بله را انتخاب کنید." +
  markdownNewline + "بعد از تصمیم‌گیری، لطفا دکمه تایید، در پایین فرم‌ها، را بزنید.  "
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
        InterventionDescription[InterventionGroupName].Text +
        markdownNewline +
        temptationeText
      ,
      choices: InterventionDescription[InterventionGroupName].Choices,
      isRequired: true,
      requiredErrorText: "لطفا یکی از گزینه‌ها را انتخاب کنید.",
    },
    {
      type: "multipletext",
      name: "SelfANDOtherPIIInformation",
      title: {
        default: "",
        fa: " کسی معرف شما نبوده است. مشخصات خود را تکمیل کنید.",
      },
      "enableIf": "{ReceiveOtherResultsRequest}='YesWantToGet'",
      items: [
        {

          name: "selfNameRevised",
          title: {
            default: "",
            fa: "نام شما:",
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
            fa: "نام خانوادگی شما:",
          },
        },
        {
          name: "selfPhoneNumberRevised",
          title: {
            fa: "شماره موبایل شما:",
            default: "Mobile number",
          },
        },
        {
          name: "selfEmailAddressRevised",
          title: {
            default: "Email address",
            fa: "ایمیل شما:",
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
            fa: "آی دی تلگرام شما:",
          },
        },
      ],
    }, {
      type: "multipletext",
      name: "SelfANDOtherPIIInformationOther",
      title: {
        default: "Please enter your mobile phone number and email address.",
        fa: "مشخصات شرکت‌کننده معرفی شده را تکمیل کنید.",
      },
      "enableIf": "{ReceiveOtherResultsRequest}='YesWantToGet'",
      items: [
        {
          // type: "nouislider",
          // type: "text",
          name: "otherNameRevised",
          title: {
            default: "Name",
            fa: "نام شرکت کننده جدید:",
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
const dynamicNewParticipant = [{
  "showQuestionNumbers": "off",
  "elements": [
    {
      "type": "paneldynamic",
      "name": "items",
      "title": "Items",
      "keyName": "name",
      "showQuestionNumbers": "off",
      "templateTitle": "item #{panelIndex}",
      "templateElements": [
        {
          "type": "text",
          "name": "name",
          "title": "Name:",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "cost",
          "inputType": "number",
          "title": "Item Cost:",
          "isRequired": true,
          "startWithNewLine": false
        },
        {
          "type": "text",
          "name": "vendor",
          "title": "Vendor:",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "quantity",
          "inputType": "number",
          "title": "Quantity:",
          "isRequired": true,
          "startWithNewLine": false
        }, {
          "type": "text",
          "name": "link",
          "title": "Link:",
          "isRequired": true
        }, {
          "type": "expression",
          "name": "total",
          "title": "Total Item Cost:",
          "expression": "{panel.cost} * {panel.quantity}",
          "displayStyle": "currency",
          "currency": "EUR",
          "startWithNewLine": false
        }
      ],
      "minPanelCount": 1,
      "panelAddText": "Add another  item",
      "panelRemoveText": "Remove item"
    }, {
      "type": "panel",
      "title": "Totals",
      "elements": [
        {
          "type": "expression",
          "name": "totalQuantity",
          "title": "Total  Quantity:",
          "expression": "sumInArray({items}, 'quantity')"
        }, {
          "type": "expression",
          "name": "totalCost",
          "title": "Total Cost:",
          "expression": "sumInArray({items}, 'total')",
          "displayStyle": "currency",
          "currency": "EUR",
          "startWithNewLine": false
        }
      ]
    }
  ]
}
]

const json = {
  pages: [
    {
      name: "FinalReceiveResultsAgreement",
      elements: [
        ...Intervention,
        ...dynamicNewParticipant,
      ],
    },
  ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  completeText: "تایید",
  pageNextText: "تایید",
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
        timestampsforoptionchange: survey.timestampsoptions,
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

    // console.log("LOGG1:", this.state.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName)
    // console.log("LOGG1:", this.state.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName)
    // console.log("LOGG1:", this.props.participantFromAPI.participantFromAPI)
    // console.log("LOGG2:", model)

    model.onAfterRenderQuestion.add((sender, options) => {
      // console.log(this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName)
      // console.log("Log1:", this.props.participantFromAPI)
      const selfNameRevised = this.props.participantFromAPI?.participantFromAPI?.selfPIIDisclosure?.selfPIIDisclosureData?.selfPIIDisclosureMultiText?.selfName ? this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfName : ""
      const selfFamilyNameRevised = this.props.participantFromAPI?.participantFromAPI?.selfPIIDisclosure?.selfPIIDisclosureData?.selfPIIDisclosureMultiText?.selfFamilyName ? this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfFamilyName : ""
      const selfPhoneNumberRevised = this.props.participantFromAPI?.participantFromAPI?.selfPIIDisclosure?.selfPIIDisclosureData?.selfPIIDisclosureMultiText?.selfPhoneNumber ? this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfPhoneNumber : ""
      const selfEmailAddressRevised = this.props.participantFromAPI?.participantFromAPI?.selfPIIDisclosure?.selfPIIDisclosureData?.selfPIIDisclosureMultiText?.selfEmailAddress ? this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfEmailAddress : ""
      const selfTelegramIDRevised = this.props.participantFromAPI?.participantFromAPI?.selfPIIDisclosure?.selfPIIDisclosureData?.selfPIIDisclosureMultiText?.selfTelegramID ? this.props.participantFromAPI.participantFromAPI.selfPIIDisclosure.selfPIIDisclosureData.selfPIIDisclosureMultiText.selfTelegramID : ""
      const otherNameRevised = this.props.participantFromAPI?.participantFromAPI?.otherPIIDisClosure?.otherPIIDisClosureData?.otherPIIDisClosureMultiText?.otherName ? this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.otherPIIDisClosureData.otherPIIDisClosureMultiText.otherName : ""
      const otherFamilyNameRevised = this.props.participantFromAPI?.participantFromAPI?.otherPIIDisClosure?.otherPIIDisClosureData?.otherPIIDisClosureMultiText?.otherFamilyName ? this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.otherPIIDisClosureData.otherPIIDisClosureMultiText.otherFamilyName : ""
      const otherPhoneNumberRevised = this.props.participantFromAPI?.participantFromAPI?.otherPIIDisClosure?.otherPIIDisClosureData?.otherPIIDisClosureMultiText?.otherPhoneNumber ? this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.otherPIIDisClosureData.otherPIIDisClosureMultiText.otherPhoneNumber : ""
      const otherEmailAddressRevised = this.props.participantFromAPI?.participantFromAPI?.otherPIIDisClosure?.otherPIIDisClosureData?.otherPIIDisClosureMultiText?.otherEmailAddress ? this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.otherPIIDisClosureData.otherPIIDisClosureMultiText.otherEmailAddress : ""
      const otherTelegramIDRevised = this.props.participantFromAPI?.participantFromAPI?.otherPIIDisClosure?.otherPIIDisClosureData?.otherPIIDisClosureMultiText?.otherTelegramID ? this.props.participantFromAPI.participantFromAPI.otherPIIDisClosure.otherPIIDisClosureData.otherPIIDisClosureMultiText.otherTelegramID : ""

      if (this.props.participantFromAPI.participantFromAPI) {
        sender.data = {
          SelfANDOtherPIIInformation: {
            selfNameRevised: selfNameRevised,
            selfFamilyNameRevised: selfFamilyNameRevised,
            selfPhoneNumberRevised: selfPhoneNumberRevised,
            selfEmailAddressRevised: selfEmailAddressRevised,
            selfTelegramIDRevised: selfTelegramIDRevised,
          },
          SelfANDOtherPIIInformationOther: {
            otherNameRevised: otherNameRevised,
            otherFamilyNameRevised: otherFamilyNameRevised,
            otherPhoneNumberRevised: otherPhoneNumberRevised,
            otherEmailAddressRevised: otherEmailAddressRevised,
            otherTelegramIDRevised: otherTelegramIDRevised,
          }
        }
      }
    }
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
