import React from "react";
import SurveyFinalPage from "./SurveyFinalPage";
import * as Survey from "survey-react";
import { Converter } from "showdown";
//  ^ خروچی پی دی اف گرفتن
// import { SurveyPDF } from "survey-pdf";
// import "nouislider/distribute/nouislider.css";
import "survey-react/survey.css";
import "../style.css";
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as widgets from "surveyjs-widgets";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant, editParticipantGermany } from "../../actions";
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
//  ^ خروچی پی دی اف گرفتن
// const exportToPdfOptions = {
//   fontSize: 12,
// };
const RandomizeGroups = (a, b) => (Math.random() > 0.5 ? a : b);

const requiredErrorTextForAllQuest = "لطفا مقدار مورد نظرتان را  انتخاب کنید";
const isRequiredForAllQuestions = true;
// const isRequiredForAllQuestions = true;
const markdownNewline = "<br />";
// const markdownNewline = "";
const markdownTabCharachter = "&nbsp;";
// "";
const ineIndicatorCharachter = [];
// ineIndicatorCharachter[0] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[0] = "";
ineIndicatorCharachter[1] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[2] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[3] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[4] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[5] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[6] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[7] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[8] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[9] = markdownNewline + markdownTabCharachter + "- ";
ineIndicatorCharachter[10] = markdownNewline + markdownTabCharachter + "- ";
const StartingDoubleQoute = "«";
const EndingDoubleQoute = "»";
// const StartingDoubleQoute = "";
// const EndingDoubleQoute = "";
const winnerCount = 3;
const minValuation = 0;
const maxValuation = 1000;
const defaultValue = 500;
const step = 1;

// questionType = "text";
const questionType = "nouislider";
const makeColorfullMarkdown = (text, color) => {
  return `<${color}>${text}</${color}>`;
  // return `${text}`;
};
const minMaxTextTitile =
  "بین " +
  "<red>" +
  minValuation +
  "</red>" +
  " تا " +
  "<red>" +
  maxValuation +
  "</red>";

const firstCommonLineforQuestions = (groupName) => {
  switch (groupName) {
    case "norm":
      return (
        "حدس می زنید " +
        "<blue>" +
        " شرکت کنندگان دیگر" +
        "</blue>" +
        "، این مجموعه‌داده را چقدر ارزش‌گذاری کرده‌اند؟ " + markdownNewline);
    case "att":
      return (
        "حدس می زنید " +
        "<blue>" +
        " ارزش واقعی" +
        "</blue>" +
        " این مجموعه‌داده، چقدر  باشد؟" + markdownNewline
      );
    default:
      return "";
  };
}

var group01FirstLines = ""
var group02FirstLines = ""

const secondCommonLineforQuestions =
  "" +
  ineIndicatorCharachter[1] +
  // " این برنامه، هر روز اطلاعاتی که با رنگ" +
  " لیست اطلاعاتی که سازنده برنامه، از موبایل کاربران دریافت و ذخیره می‌کند:";
// makeColorfullMarkdown(" آبی ", "blue") +
// " مشخص شده اند، از استفاده کنندگان دریافت کرده و برای سازنده ارسال می کند.";
const singleQuestionDesc =
  ineIndicatorCharachter[1] +
  "  یک برنامه موبایل به شما معرفی شده است." +
  ineIndicatorCharachter[3] +
  " سازنده این برنامه موبایل، اطلاعات مشخصی را از موبایل کاربران دریافت و ذخیره می‌کند." +
  ineIndicatorCharachter[7] +
  " اطلاعات زیادی از ۶ ماه پیش تاکنون، از کاربران ایرانی جمع شده است." +
  ineIndicatorCharachter[8] +
  " احتمالا، اطلاعات دوستان و آشنایان شما در این مجموعه اطلاعات وجود دارد ." +
  ineIndicatorCharachter[9] +
  " سازنده برنامه در ازای پول، " +
  makeColorfullMarkdown(" مجموعه اطلاعات ذخیره شده", "red") +
  " را، به شما می‌دهد تا به دلخواه‌تان، آن‌را جستجو و  مشاهده کنید.";

const desc = "";
const discPlural =
  ineIndicatorCharachter[1] +
  " پس از فشار دادن دکمه تایید، یک برنامه به شما معرفی می‌شود." +
  ineIndicatorCharachter[3] +
  " سازنده این برنامه موبایل، اطلاعات مشخصی را از موبایل کاربران دریافت و ذخیره می‌کند." +
  ineIndicatorCharachter[7] +
  " اطلاعات زیادی از ۶ ماه پیش تاکنون، از کاربران ایرانی جمع شده است." +
  ineIndicatorCharachter[8] +
  " احتمالا، اطلاعات دوستان و آشنایان شما در این مجموعه اطلاعات وجود دارد ." +
  ineIndicatorCharachter[9] +
  " سازنده برنامه در ازای پول، " +
  makeColorfullMarkdown(" مجموعه اطلاعات ذخیره شده", "red") +
  " را، به شما می‌دهد تا به دلخواه‌تان، آن‌را جستجو و  مشاهده کنید.";
const initialDescription = (rewDescInFunction) =>
  `${discPlural}${markdownNewline}${rewDescInFunction}`;
const normRewardDesc = `
  مقدار پولی را 
  ${minMaxTextTitile} 
  انتخاب کنید تا به سازنده برنامه پرداخت شود.
  ${markdownNewline}
   باید حدس بزنید که
   <blue>
   شرکت‌کنندگان دیگر
   </blue>
    ، چه ارزشی را انتخاب کرده اند و عددی که به
   ${makeColorfullMarkdown(" نظرتان به انتخاب دیگران نزدیک", "green")}
     است، را انتخاب کنید.
     ${markdownNewline} 
   به
  ${winnerCount}
   نفر که حدس درست تری داشته باشند،
    جایزه‌ای تعلق می گیرد.          
    `;
const attitudetestQuestionsrewardDesc = `
  مقدار پولی را 
  ${minMaxTextTitile} 
  انتخاب کنید تا به سازنده برنامه پرداخت شود.
  ${markdownNewline}
  ${makeColorfullMarkdown(" به نظر شما ", "green")}
  ارزش این مجموعه‌داده چقدر است؟
  ارزش واقعی این مجموعه‌داده قبلا توسط یک متخصص علوم داده
(Data Scientist)
ارزش‌گذاری شده است.
     ${markdownNewline} 
   به
  ${winnerCount}
   نفر که 
   ${makeColorfullMarkdown(" ارزش واقعی ", "green")}
    را درست‌تر حدس زده باشند،
    جایزه‌ای تعلق می گیرد.          
    `;
const thirdCommonLineforQuestionsAttitude = "ارزش واقعی این مجموعه داده را حدس بزنید و از " +
  minValuation +
  " تا " +
  maxValuation +
  "بر روی دکمه کشویی زیر، انتخاب کنید."

const thirdCommonLineforQuestionsNorm = "ارزشی که حدس می‌زنید، دیگران به این مجموعه داده می‌دهند را، از " +
  minValuation +
  " تا " +
  maxValuation +
  "انتخاب کنید."
const normInitialDescription = initialDescription(normRewardDesc);
const attitudeInitialDescription = initialDescription(attitudetestQuestionsrewardDesc);
const singleTestNormQuestionsDesc =
  ineIndicatorCharachter[1] +
  "  یک برنامه موبایل به شما معرفی شده است." +
  ineIndicatorCharachter[3] +
  " سازنده این برنامه موبایل، اطلاعات مشخصی را از موبایل کاربران دریافت و ذخیره می‌کند." +
  ineIndicatorCharachter[7] +
  " اطلاعات زیادی از ۶ ماه پیش تاکنون، از کاربران ایرانی جمع شده است." +
  ineIndicatorCharachter[8] +
  " احتمالا، اطلاعات دوستان و آشنایان شما در این مجموعه اطلاعات وجود دارد ." +
  ineIndicatorCharachter[9] +
  " سازنده برنامه در ازای پول، " +
  makeColorfullMarkdown(" مجموعه اطلاعات ذخیره شده", "red") +
  " را، به شما می‌دهد تا به دلخواه‌تان، آن‌را جستجو و  مشاهده کنید." +
  markdownNewline +
  thirdCommonLineforQuestionsNorm;

// const singleTestNormQuestionsDesc = singleQuestionDesc + normInitialDescription;
const singleTestAttitudeQuestionsDesc =

  ineIndicatorCharachter[1] +
  "  یک برنامه موبایل به شما معرفی شده است." +
  ineIndicatorCharachter[3] +
  " سازنده این برنامه موبایل، اطلاعات مشخصی را از موبایل کاربران دریافت و ذخیره می‌کند." +
  ineIndicatorCharachter[7] +
  " اطلاعات زیادی از ۶ ماه پیش تاکنون، از کاربران ایرانی جمع شده است." +
  ineIndicatorCharachter[8] +
  " احتمالا، اطلاعات دوستان و آشنایان شما در این مجموعه اطلاعات وجود دارد ." +
  ineIndicatorCharachter[9] +
  " سازنده برنامه در ازای پول، " +
  makeColorfullMarkdown(" مجموعه اطلاعات ذخیره شده", "red") +
  " را، به شما می‌دهد تا به دلخواه‌تان، آن‌را جستجو و  مشاهده کنید." +
  markdownNewline +
  thirdCommonLineforQuestionsAttitude;


var testQuestionsForNormValue = [
  {
    name: "TestQuestion01", //#1
    elements: [
      {
        type: questionType,
        name: "TestQuestion01",
        title:
          "" +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه تاکسی اینترنتی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " زمان و مکان دقیق سوار و پیاده شدن کاربر ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            " برنامه رفت و آمد و مسیرهای پر تکرار کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            " مقدار پول پرداختی کاربر در یک سال گذشته",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن و نام و نام خانوادگی کاربر",
            "blue"
          ),
        popupdescription: singleTestNormQuestionsDesc,
        description: {
          default: "",
          fa: singleTestNormQuestionsDesc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "TestQuestion02", //#1
    elements: [
      {
        type: questionType,
        name: "TestQuestion02",
        title:
          "<nazlifont>" +
          "" +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه راهنمای زوج‌ها" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " لیست مشکلات زناشویی مطرح شده توسط کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + " سابقه قهر و آشتی کردن کاربر با همسر‌",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" فاقد", "green") +
            " هر گونه مشخصات فردی کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleTestNormQuestionsDesc,
        description: {
          default: "",
          fa: singleTestNormQuestionsDesc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
];
const beforeTestQuestDescNorm = [
  {
    name: "1stMoreGuidance",
    elements: [
      {
        type: "html",
        name: "1stMoreGuidance",
        title: ``,
        html: `<p className="font-face-nazli">
      برای آشنایی بهتر شما، در ادامه ۲ برنامه به عنوان مثال معرفی می‌شوند.
    </p>
    <p className="font-face-nazli">
      برای ارزش‌گذاری آنها از 
      <green>
      دکمه کشویی
      </green>
       استفاده کنید.
    </p>
    <p className="font-face-nazli">
     روش  انجام را می توانید مجددا در توضیحات این دو سوال، ببینید.
    </p>`,
        choices: ["ادامه"],
        isRequired: isRequiredForAllQuestions,
        requiredErrorText:
          "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
      },
    ],
  },
];
const beforeTestQuestDescAtt = [
  {
    name: "1stMoreGuidance",
    elements: [
      {
        type: "html",
        name: "1stMoreGuidance",
        title: ``,
        html: `<p className="font-face-nazli">
      برای آشنایی بهتر شما، در ادامه ۲ برنامه به عنوان مثال معرفی می‌شوند.
    </p>
    <p className="font-face-nazli">
      برای ارزش‌گذاری آنها از 
      <green>
      دکمه کشویی
      </green>
       استفاده کنید.
    </p>
    <p className="font-face-nazli">
     روش  انجام را می توانید مجددا در توضیحات این دو سوال، ببینید.`,
        choices: ["ادامه"],
        isRequired: isRequiredForAllQuestions,
        requiredErrorText:
          "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
      },
    ],
  },
];
const afterTestQuestDesc = [
  {
    name: "2ndMoreGuidance",
    elements: [
      {
        type: "html",
        name: "2ndMoreGuidance",
        title: ``,
        html: `
      <p className="font-face-nazli">
        سوالات اصلی در ادامه ارائه می شوند.
      </p>`,
        choices: ["ادامه"],
        isRequired: isRequiredForAllQuestions,
        requiredErrorText:
          "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
      },
    ],
  },
];
testQuestionsForNormValue = [
  ...beforeTestQuestDescNorm,
  ...testQuestionsForNormValue,
  ...afterTestQuestDesc,
];

const twoTestQuestionsForAttitudeValue = [
  {
    name: "attitudeTestQuestion01", //#1
    elements: [
      {
        type: questionType,
        name: "attitudeTestQuestion01",
        title:
          "" +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه حسابداری" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + " لیست هزینه‌ها و درآمدهای کاربر ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن و نام و نام خانوادگی کاربر",
            "blue"
          ),
        popupdescription: singleTestAttitudeQuestionsDesc,
        description: {
          default: "",
          fa: singleTestAttitudeQuestionsDesc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        // "defaultValue": 66,        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "attitudeTestQuestion02", //#1
    elements: [
      {
        type: questionType,
        name: "attitudeTestQuestion02",
        title:
          "<nazlifont>" +
          "" +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه راهنمای پزشکی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + " لیست بیماری‌های کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + " سابقه مصرف دارو توسط کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" فاقد", "green") +
            " هر گونه مشخصات فردی کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleTestAttitudeQuestionsDesc,
        description: {
          default: "",
          fa: singleTestAttitudeQuestionsDesc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
];
const attitudetestQuestionsdiscPlural =
  discPlural + attitudetestQuestionsrewardDesc;

const attitudetestQuestions = [
  {
    name: "1stMoreGuidanceAtt",
    elements: [
      {
        type: "html",
        name: "1stMoreGuidanceAtt",
        title: ``,
        html: `<p className="font-face-nazli">
      برای آشنایی بهتر شما، در ادامه ۲ برنامه به عنوان مثال معرفی می‌شوند.
    </p>
    <p className="font-face-nazli">
      برای ارزش‌گذاری آنها از
      <green>
      دکمه کشویی
      </green>
       موجود استفاده کنید.
    </p>
    <p className="font-face-nazli">
     روش  انجام را می توانید مجددا در توضیحات این دو سوال، ببینید.
  </p>`,
        choices: ["ادامه"],
        isRequired: isRequiredForAllQuestions,
        requiredErrorText:
          "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
      },
    ],
  },
];
const twoTestQuestionsForAttitudeValueAndDescs = [
  ...beforeTestQuestDescAtt,
  ...twoTestQuestionsForAttitudeValue,
  ...afterTestQuestDesc,
];
const attitudeAndNormValueGuesingNames = RandomizeGroups(
  ["Group01", "Group02"],
  ["Group02", "Group01"]
);

const attitudeAndNormValueGuesingFirstLines = {
  [attitudeAndNormValueGuesingNames[0]]: "norm",
  [attitudeAndNormValueGuesingNames[1]]: "att"
}
group01FirstLines = attitudeAndNormValueGuesingFirstLines.Group01
group02FirstLines = attitudeAndNormValueGuesingFirstLines.Group02

const auctionQuestionsUnshuffledGroup01 = [
  {
    name: "AGMPBidPhysicalPrivacy01", //#1
    elements: [
      {
        type: questionType,
        name: "AGMPBidPhysicalPrivacy01",
        title:
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مدیریت قرار‌ها" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            "زمان و مکان دقیق قرارهای ملاقات آینده کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            "برنامه رفت و آمد و مسیرهای پر تکرار کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            "آدرس دقیق محل زندگی، محل کار و تحصیل کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن کاربر",
            "blue"
          ),
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AGMPBidSocialPrivacy01", //#3
    elements: [
      {
        type: questionType,
        name: "AGMPBidSocialPrivacy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه خاطره نویسی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + " متن خاطرات خجالت‌آور کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + " متن اشتباهات گذشته کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربر" +
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و آی دی تلگرام کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AttentionAssessmentQuestion", //#5
    elements: [
      {
        type: questionType,
        name: "AttentionAssessmentQuestion",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            " تستی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            "این سوال برای سنجش صحت انجام آزمایش می باشد.",
            "blue"
          ) + makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            " لطفا عدد این سوال را روی هزار قرار دهید.",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[5] +
            makeColorfullMarkdown("", "green") +
            "  عدد این سوال را روی هزار قرار دهید.",
            "blue"
          )
        ,
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  }, {
    name: "AGMPBidResourceRelatedPrivacy01", //#5
    elements: [
      {
        type: questionType,
        name: "AGMPBidResourceRelatedPrivacy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه خرید آنلاین" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            "لیست محصولات یا خدماتی که کاربر دوست دارد، بزودی خریداری کند ",
            "blue"
          ) + makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[5] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و آی دی تلگرام کاربر",
            "blue"
          )
        ,
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AGMPBidPsychologicalPrivacy01", //#7
    elements: [
      {
        type: questionType,
        name: "AGMPBidPsychologicalPrivacy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مدیریت دوربین‌های حفاظتی منزل" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " فایل‌های فیلم‌‌برداری شده از داخل خانه کاربر ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            makeColorfullMarkdown(" بدون", "green") +
            " صدا",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            makeColorfullMarkdown("فاقد ", "green") +
            " هر گونه مشخصات فردی کاربر یا ساکنین",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AGMPBidProsecutionRelatedPrivacy01", //#9
    elements: [
      {
        type: questionType,
        name: "AGMPBidProsecutionRelatedPrivacy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مدیرت کننده سیستم  حسابداری شرکت‌ها" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " اطلاعات مالی نشان‌دهنده فرار مالیاتی شرکت‌ها و افراد ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            " اطلاعات مالی نشان‌دهنده درآمد‌های ناشی از قاچاق کالا",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            " حساب‌های همه پرداخت‌ها که در جای دیگر ثبت نشده",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[5] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی افراد مسئول در شرکت",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[6] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و شرکت‌ها و افراد",
            "blue"
          ) +
          // "دسترسی به داده‌های یک اپلیکیشن اشتراک فیلم" +
          // " که حاوی اطلاعات کاربران شامل" +
          // makeColorfullMarkdown(" لیست فیلم‌هایی", "blue") +
          // " که کاربر" +
          // makeColorfullMarkdown(" بدون پرداخت پول به تولید کننده", "blue") +
          // " فیلم داونلود کرده‌انداست " +
          // " و به همراه " +
          // makeColorfullMarkdown(
          //   " نام، نام خانوادگی کاربر، شماره تلفن، ایمیل و آی دی تلگرام کاربر",
          //   "blue"
          // ) +
          // " کاربر است." +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AGMPBidCareerRelatedPrivacy01", //#11
    elements: [
      {
        type: questionType,
        name: "AGMPBidCareerRelatedPrivacy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مشاوره شغلی و تحصیلی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + " واقعی یا دروغین بودن رزومه کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + "نقاط ضعف‌ شغلی یا تحصیلی کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            " متن نامه‌های مبادله شده کاری یا تحصیلی کاربر به شرکت‌ها و دانشگاه‌ها ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[5] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و آی دی تلگرام کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AGMPBidFreedomRelatedPrivacy01", //#13
    elements: [
      {
        type: questionType,
        name: "AGMPBidFreedomRelatedPrivacy01",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه آموزش جستجو" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + "سابقه جستجوهای کاربر در گوگل ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و آی دی تلگرام کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
];
const auctionQuestionsUnshuffledGroup02 = [
  {
    name: "AGMPBidPhysicalPrivacy02", //#2
    elements: [
      {
        type: questionType,
        name: "AGMPBidPhysicalPrivacy02",
        title:
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه ورزش و سلامت" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " اطلاعات موقعیت مکانی دقیق در طول ۲۴ ساعت کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + " عکس صورت کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            " ویژگی‌های فیزیکی مانند جنسیت، سن، قد و وزن کاربر",
            "blue"
          ) + makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            makeColorfullMarkdown(" فاقد", "green") +
            " هر گونه دیگر مشخصات فردی کاربر ",
            "blue"
          )
        ,
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },

  {
    name: "AGMPBidSocialPrivacy02", //#4
    elements: [
      {
        type: questionType,
        name: "AGMPBidSocialPrivacy02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مشاوره" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " متن دلخوری‌ها، ناراحتی‌ها،" +
            " اختلافات بیان نشده کاربر از دوستان و اعضای خانواده ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            makeColorfullMarkdown(" فاقد", "green") +
            " هر گونه مشخصات فردی کاربر ",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },

  {
    name: "AGMPBidResourceRelatedPrivacy02", //#6
    elements: [
      {
        type: questionType,
        name: "AGMPBidResourceRelatedPrivacy02",
        title:
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه بانکی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            " حساب‌های بانکی کاربر به همراه رمز حساب‌ها.",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربر",
            "blue"
          ),
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AttentionAssessmentQuestion", //#5
    elements: [
      {
        type: questionType,
        name: "AttentionAssessmentQuestionZero",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group01FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه خرید تستی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] +
            "این سوال برای سنجش صحت انجام آزمایش می باشد.",
            "blue"
          ) + makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            " لطفا عدد این سوال را روی صفر قرار دهید.",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[5] +
            makeColorfullMarkdown("", "green") +
            "  عدد این سوال را روی صفر قرار دهید.",
            "blue"
          )
        ,
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
  {
    name: "AGMPBidPsychologicalPrivacy02", //#8
    elements: [
      {
        type: questionType,
        name: "AGMPBidPsychologicalPrivacy02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه یادداشت برداری" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + "یادداشت‌‌های روزانه کاربر ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            makeColorfullMarkdown("فاقد ", "green") +
            " هر گونه مشخصات فردی کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },

  {
    name: "AGMPBidProsecutionRelatedPrivacy02", //#10
    elements: [
      {
        type: questionType,
        name: "AGMPBidProsecutionRelatedPrivacy02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مدیریت دوربین‌های ترافیکی" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + " فیلم تخلفات رانندگی اتوموبیل‌ها",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + "شماره پلاک اتومبیل متخلف",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            makeColorfullMarkdown(" فاقد", "green") +
            " هر گونه مشخصات راننده‌ای که پشت فرمان بوده است",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },

  {
    name: "AGMPBidCareerRelatedPrivacy02", //#12
    elements: [
      {
        type: questionType,
        name: "AGMPBidCareerRelatedPrivacy02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه پیام‌رسان" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + " گفتگوی خصوصی میان دانشجویان",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] + " گفتگوی خصوصی میان کارمندان ",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            makeColorfullMarkdown(" فقط", "green") +
            " درباره موضوعات کاری یا تحصیلی",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربران",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[5] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و آی دی تلگرام کاربران",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },

  {
    name: "AGMPBidFreedomRelatedPrivacy02", //#14
    elements: [
      {
        type: questionType,
        name: "AGMPBidFreedomRelatedPrivacy02",
        title:
          "<nazlifont>" +
          firstCommonLineforQuestions(group02FirstLines) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[0] +
            StartingDoubleQoute +
            "برنامه مشاوره ازدواج" +
            EndingDoubleQoute,
            "green"
          ) +
          secondCommonLineforQuestions +
          makeColorfullMarkdown(
            ineIndicatorCharachter[1] + "لیست رابطه‌های عاطفی کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[2] +
            "لیست مشکلات شخصیتی و روانی کاربر که رابطه عاطفی را مختل می‌کند",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[3] +
            makeColorfullMarkdown(" دارای", "green") +
            " نام، نام خانوادگی کاربر",
            "blue"
          ) +
          makeColorfullMarkdown(
            ineIndicatorCharachter[4] +
            makeColorfullMarkdown(" دارای", "green") +
            " شماره تلفن، ایمیل و آی دی تلگرام کاربر",
            "blue"
          ) +
          "</nazlifont>",
        popupdescription: singleQuestionDesc,
        description: {
          default: "",
          fa: desc,
        },
        isRequired: isRequiredForAllQuestions,
        requiredErrorText: requiredErrorTextForAllQuest,
        "rangeMin": minValuation,
        "rangeMax": maxValuation,
        "defaultValue": defaultValue,
        "step": step,
      },
    ],
  },
];
//  Shuffle the questions
// const auctionQuestionsShuffled = auctionQuestionsUnshuffled
//   .map((value) => ({ value, sort: Math.random() }))
//   .sort((a, b) => a.sort - b.sort)
//   .map(({ value }) => value);

// const RandomizeGroups = (a, b) => (Math.random() > 0.5 ? a : b);

const ValueGuesing = {
  Group01: RandomizeGroups(
    ["Unreversed", auctionQuestionsUnshuffledGroup01],
    ["Reversed", auctionQuestionsUnshuffledGroup01.slice().reverse()]
  ),

  Group02: RandomizeGroups(
    ["Unreversed", auctionQuestionsUnshuffledGroup02],
    ["Reversed", auctionQuestionsUnshuffledGroup02.slice().reverse()]
  ),
};


const attitudeAndNormValueGuesing = {
  normValueG: ValueGuesing[attitudeAndNormValueGuesingNames[0]],
  attitudeValueG: ValueGuesing[attitudeAndNormValueGuesingNames[1]],
};
// const singleQuestDescOthersOrSpecialist = {
//   att: {
//     attDesc: thirdCommonLineforQuestionsAttitude,
//     attQuest: attitudeAndNormValueGuesing.attitudeValueG
//   },
//   nor: {
//     normDesc: thirdCommonLineforQuestionsNorm,
//     norQuest: attitudeAndNormValueGuesing.normValueG
//   }
// }

const initialNormAgreementQuestion = [
  {
    name: "TPBQuestionnaireNormDesc",
    title: "<red>بازی حدس زدن " +
      StartingDoubleQoute +
      "ارزش مجموعه‌داده از نگاه دیگران" +
      EndingDoubleQoute +
      "</red>",
    elements: [
      {
        type: "radiogroup",
        name: "TPBQuestionnaireDesc",
        title: normInitialDescription,
        choices: ["آماده انجام این بخش هستم."],
        isRequired: true,
        requiredErrorText:
          "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
      },
    ],
  },
];
const initialAttitudeAgreementQuestion = [
  {
    name: "TPBAttitudeQuestionnaireAttDesc",
    title: "<red>بازی حدس زدن " +
      StartingDoubleQoute +
      "ارزش مجموعه‌داده" +
      EndingDoubleQoute +
      "</red>",
    elements: [
      {
        type: "radiogroup",
        name: "TPBAttitudeQuestionnaireDesc",
        title: attitudeInitialDescription,
        choices: ["آماده انجام این بخش هستم."],
        isRequired: true,
        requiredErrorText:
          "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
      },
    ],
  },
];
// var NormQuests = singleQuestDescOthersOrSpecialist.nor.norQuest
// var NormDescGuide = singleQuestDescOthersOrSpecialist.nor.normDesc

// var AttQuests = singleQuestDescOthersOrSpecialist.att.attQuest
// var AttDescGuide = singleQuestDescOthersOrSpecialist.att.attDesc
// NormQuests = NormQuests.reduce((questHere) => {
//   return [questHere.description.fa = NormDescGuide]
// })
// AttQuests = AttQuests.reduce((questHere) => {
//   return [questHere.description.fa = AttDescGuide]
// })
const normQuests = attitudeAndNormValueGuesing["normValueG"][1]
const attQuests = attitudeAndNormValueGuesing["attitudeValueG"][1]

const Part01Quests = [...initialNormAgreementQuestion,
...testQuestionsForNormValue,
...normQuests]
const Part02Quests = [...initialAttitudeAgreementQuestion,
...twoTestQuestionsForAttitudeValueAndDescs,
...attQuests,]
const RandQuests = RandomizeGroups([Part01Quests, Part02Quests], [Part02Quests, Part01Quests])
var json = {

  pages: [
    ...RandQuests[0],
    ...RandQuests[1],
  ],
  // pages: [
  //   ...initialNormAgreementQuestion,
  //   ...testQuestionsForNormValue,
  //   ...normQuests,
  //   ...initialAttitudeAgreementQuestion,
  //   ...twoTestQuestionsForAttitudeValueAndDescs,
  //   ...attQuests,
  // ],
  widthMode: "responsive",
  questionTitlePattern: "Title",
  requiredText: "",
  // showTimerPanel: "top",
  completeText: "تایید",
  pageNextText: "تایید",
};
// json = {
// pages: [
//   ...initialNormAgreementQuestion,
//   ...testQuestionsForNormValue,
//   ...NormQuests,
//   ...initialAttitudeAgreementQuestion,
//   ...twoTestQuestionsForAttitudeValueAndDescs,
//   ...AttQuests,
// ],
//   pages: [
//     {
//       name: "TPBAttitudeQuestionnaireAttDesc",
//       title: "<red>بازی حدس زدن ارزش مجموعه‌داده</red>",
//       elements: [
//         {
//           type: "radiogroup",
//           name: "TPBAttitudeQuestionnaireDesc",
//           title: attitudeInitialDescription,
//           choices: ["آماده انجام این بخش هستم."],
//           isRequired: true,
//           requiredErrorText:
//             "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
//         },
//       ],
//     },
//   ],
//   widthMode: "responsive",
//   questionTitlePattern: "Title",
//   requiredText: "",
//   // showTimerPanel: "top",
//   completeText: "تایید",
//   pageNextText: "تایید",
// };
// console.log("json:", json);
//  ^ خروچی پی دی اف گرفتن
// const savePdf = function (surveyData) {
//   const surveyPdf = new SurveyPDF(json, exportToPdfOptions);
//   surveyPdf.data = surveyData;
//   surveyPdf.save();
// };
//  ^ مودال توضیحات سوال

// Survey.Serializer.addProperty("question", "popupdescription:text");
// Survey.Serializer.addProperty("page", "popupdescription:text");

// function showDescriptionModal(element) {
//   document.getElementById("questionDescriptionTextForModal").innerHTML =
//     element.popupdescription;
//   // Modal(document.getElementById("questionDescriptionPopupModal"), {
//   //   keyboard: true,
//   // }).show();
//   var myModal = new Modal(
//     document.getElementById("questionDescriptionPopupModal"),
//     { keyboard: true }
//   );
//   myModal.show();
// }

class WillingnessToPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { descModalOpened: false };
    this.state = { descModalClosed: false };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);

    //  ^ مودال توضیحات سوال
    // this.state = { descModalCurrentDesc: "توضیحات" };

    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.setDescModalOpenedTrue = () =>
    //   this.setState({ descModalOpened: true });
    // this.setDescModalOpenedFalse = () =>
    //   this.setState({ descModalOpened: false });
    // this.setDescModalCloseTrue = () => this.setState({ descModalClosed: true });
    // this.setDescModalCloseFalse = () =>
    //   this.setState({ descModalClosed: false });
    // this.setdescModalCurrentDesc = (descModalCurrentDescInSetFun) =>
    //   this.setState({ descModalCurrentDesc: descModalCurrentDescInSetFun });
  }
  componentDidMount() {
    // this.props.fetchParticipantPII(this.props.match.params.id);
    //disables hthe back button
    window.dispatchEvent(new CustomEvent("navigationhandler"));
  }
  //  ^ مودال توضیحات سوال با کامپونن جداگانه

  // showDescriptionModal = (popupdescriptionInFun) => {
  //   this.setdescModalCurrentDesc(popupdescriptionInFun);
  // };
  // DescModalShowFuncParrentToggleFun = (DescModalShowFuncChildToggleFun) => {
  //   return DescModalShowFuncChildToggleFun();
  // };
  // ^ ?????????????????????????????????

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
    // console.dir("order and group:", auctionQuestionsShuffled);
    const surveyData = {
      willingnessToPayOthersData: { ...survey.data },
      attitudeValueQuestionsOrder: [
        ...attitudeAndNormValueGuesing["normValueG"][1].map((guest, index) => {
          return guest.name;
        }),
      ],
      normGroupName: attitudeAndNormValueGuesingNames[0],
      normisReversed: attitudeAndNormValueGuesing["normValueG"][0],
      normValueQuestionsOrder: [
        ...attitudeAndNormValueGuesing["attitudeValueG"][1].map(
          (guest, index) => {
            return guest.name;
          }
        ),
      ],
      attitudeGroupName: attitudeAndNormValueGuesingNames[1],
      attitudeisReversed: attitudeAndNormValueGuesing["attitudeValueG"][0],
      submittime: dateTime,
      timestampsforoptionchange: survey.timestampsoptions,
    };
    this.props.editParticipant(this.props.match.params.id, {
      willingnessToPayOthers: { ...surveyData },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      willingnessToPayOthers: { ...surveyData },
    });
    // savePdf(survey.data)
  }
  render() {
    // console.log(this.json);
    widgets.nouislider(Survey);
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
    //  ^ خروچی پی دی اف گرفتن
    // model.addNavigationItem({
    //   id: "pdf-export",
    //   title: "Save as PDF",
    //   action: () => savePdf(model.data),
    // });

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
  withRouter(WillingnessToPay)
);
