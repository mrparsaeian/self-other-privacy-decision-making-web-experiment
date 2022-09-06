import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import { Converter } from "showdown";
import "survey-react/survey.css";
import "../style.css";
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { editParticipant, editParticipantGermany } from "../../actions";
// import SurveyFinalPage from "./SurveyFinalPage";
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
// Survey
//   .StylesManager
//   .applyTheme("default");

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
const auctionQuestionsUnshuffled = [
  {
    name: "SexQuestion",
    elements: [
      {
        type: "radiogroup",
        name: "SexQuestion",
        title: {
          default: "Sex",
          fa: "لطفا جنسیت خود را انتخاب کنید.",
        },
        isRequired: true,
        choices: [
          {
            value: "Female",
            text: {
              default: "",
              fa: "مونث",
            },
          },
          {
            value: "Male",
            text: {
              default: "",
              fa: "مذکر",
            },
          },
          {
            value: "NoAnswer",
            text: {
              default: "",
              fa: "مایل به پاسخ نیستم",
            },
          },
        ],
      },
    ],
  }, {
    name: "AgeQuestion",
    elements: [
      {
        type: "dropdown",
        isRequired: true,
        // commentText: "سن خود را انتخاب کنید",
        // noneText: "سن خود را انتخاب کنید",
        // otherText: "سن خود را انتخاب کنید",
        // commentPlaceHolder: "سن خود را انتخاب کنید",
        // comment: "سن خود را انتخاب کنید",
        optionsCaption:
          // "<nazlifont>" + "سن خود را انتخاب کنید" + "</nazlifont>",
          "لطفا سن خود را انتخاب کنید",
        name: "AgeQuestion",
        title: {
          default: "Age",
          fa: "سن",
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
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
          "61",
          "62",
          "63",
          "64",
          "65",
          "66",
          "67",
        ],
      },
    ],
  },
  {
    name: "EducationQuestion",
    elements: [
      {
        type: "radiogroup",
        name: "EducationQuestion",
        isRequired: true,
        title: {
          default: "Education",
          fa: "لطفا میزان تحصیلات خود را بیان کنید.",
        },
        choices: [
          {
            value: "Diploma",
            text: {
              default: "High school diploma or lower",
              fa: "<nazlifont>" + "دیپلم یا زیر دیپلم" + "</nazlifont>",
            },
          },
          {
            value: "College",
            text: {
              default: "College",
              fa:
                "<nazlifont>" +
                " کارشناسی یا دانشجوی کارشناسی" +
                "</nazlifont>",
            },
          },
          {
            value: "Master",
            text: {
              default: "Post graduate",
              fa:
                "<nazlifont>" +
                "کارشناسی ارشد یا دانشجوی کارشناسی ارشد" +
                "</nazlifont>",
            },
          },
          {
            value: "PHd",
            text: {
              default: "Phd or higher",
              fa:
                "<nazlifont>" +
                "دانشجوی دکترا، دکترا یا بالاتر" +
                "</nazlifont>",
            },
          },
        ],
      },
    ],
  },
  {
    name: "UniversityName",
    elements: [
      // {
      //   "type": "tagbox",
      //   "choicesByUrl": {
      //     "url": "https://surveyjs.io/api/CountriesExample"
      //   },
      //   "name": "countries",
      //   "title": "Tagbox"
      // },
      {
        type: "text",
        isRequired: true,
        name: "UniversityName",
        hasNone: true,
        title: {
          default: "University",
          fa: "لطفا نام آخرین دانشگاه یا محل تحصیل‌تان را وارد کنید.",
        },
        "choices": ["دانشگاه آیت‌الله‌العظمی بروجردی",
          "دانشگاه اراک",
          "دانشگاه اردکان",
          "دانشگاه ارومیه",
          "دانشگاه اصفهان",
          "دانشگاه الزهرا",
          "دانشگاه ایلام",
          "دانشگاه بجنورد",
          "دانشگاه بزرگمهر",
          "دانشگاه بناب",
          "دانشگاه بوعلی سینا همدان",
          "دانشگاه بیرجند",
          "دانشگاه بین‌المللی امام خمینی",
          "دانشگاه تبریز",
          "دانشگاه تحصیلات تکمیلی صنعتی کرمان",
          "دانشگاه تحصیلات تکمیلی علوم پایه زنجان",
          "دانشگاه تخصصی فناوری‌های نوین آمل",
          "دانشگاه تربت حیدریه",
          "دانشگاه تربیت دبیر شهید رجایی",
          "دانشگاه تربیت مدرس",
          "دانشگاه تفرش",
          "دانشگاه تهران",
          "دانشگاه جیرفت",
          "دانشگاه جهرم",
          "دانشگاه حضرت نرجس رفسنجان",
          "دانشگاه حکیم سبزواری",
          "دانشگاه خلیج فارس بوشهر",
          "دانشگاه خوارزمی",
          "دانشگاه دامغان",
          "دانشگاه حضرت معصومه",
          "دانشگاه دریانوردی و علوم دریایی چابهار",
          "دانشگاه رازی کرمانشاه",
          "دانشگاه زابل",
          "دانشگاه زنجان",
          "دانشگاه سلمان فارسی کازرون",
          "دانشگاه سید جمال‌الدین اسدآبادی",
          "دانشگاه سمنان",
          "دانشگاه سیستان و بلوچستان",
          "دانشگاه شاهد",
          "دانشگاه شهرکرد",
          "دانشگاه شهید باهنر کرمان",
          "دانشگاه شهید بهشتی",
          "دانشگاه شهید چمران اهواز",
          "دانشگاه شهید مدنی آذربایجان",
          "دانشگاه شیراز",
          "دانشگاه صنعتی اراک",
          "دانشگاه صنعتی ارومیه",
          "دانشگاه صنعتی اصفهان",
          "دانشگاه صنعتی امیرکبیر",
          "دانشگاه صنعتی بیرجند",
          "دانشگاه صنعتی جندی‌شاپور",
          "دانشگاه صنعتی خاتم‌الانبیا",
          "دانشگاه صنعتی خواجه نصیرالدین طوسی",
          "دانشگاه صنعتی سهند",
          "دانشگاه صنعتی سیرجان",
          "دانشگاه صنعتی شاهرود",
          "دانشگاه صنعتی شریف",
          "دانشگاه صنعتی شهدای هویزه",
          "دانشگاه صنعتی شیراز",
          "دانشگاه صنعتی قم",
          "دانشگاه صنعتی قوچان",
          "دانشگاه صنعتی کرمانشاه",
          "دانشگاه صنعتی نوشیروانی بابل",
          "دانشگاه صنعتی همدان",
          "دانشگاه علامه طباطبایی",
          "دانشگاه علم و صنعت ایران",
          "دانشگاه علم و فناوری مازندران",
          "دانشگاه علوم و فنون دریایی خرمشهر",
          "دانشگاه علوم کشاورزی و منابع طبیعی ساری",
          "دانشگاه علوم کشاورزی و منابع طبیعی گرگان",
          "دانشگاه فردوسی مشهد",
          "دانشگاه فرزانگان سمنان",
          "دانشگاه فسا",
          "دانشگاه قم",
          "دانشگاه کاشان",
          "دانشگاه کردستان",
          "دانشگاه کشاورزی و منابع طبیعی رامین",
          "دانشگاه کوثر بجنورد",
          "دانشگاه گرمسار",
          "دانشگاه گلستان",
          "دانشگاه گنبد کاووس",
          "دانشگاه گیلان",
          "دانشگاه لرستان",
          "دانشگاه مازندران",
          "دانشگاه محقق اردبیلی",
          "دانشگاه مراغه",
          "دانشگاه ملایر",
          "دانشگاه مهندسی علوم و فناوری‌های نوین گلبهار",
          "دانشگاه میبد",
          "دانشگاه نیشابور",
          "دانشگاه ولایت ایرانشهر",
          "دانشگاه ولی‌عصر رفسنجان",
          "دانشگاه هرمزگان",
          "دانشگاه هنر اسلامی تبریز",
          "دانشگاه هنر اصفهان",
          "دانشگاه هنر تهران",
          "دانشگاه هنر شیراز",
          "دانشگاه یاسوج",
          "دانشگاه یزد",
          "دانشگاه علوم بهزیستی و توانبخشی",
          "دانشگاه علوم پزشکی آبادان",
          "دانشگاه علوم پزشکی اراک",
          "دانشگاه علوم پزشکی ارتش",
          "دانشگاه علوم پزشکی اردبیل",
          "دانشگاه علوم پزشکی ارومیه",
          "دانشکده علوم پزشکی اسدآباد",
          "دانشکده علوم پزشکی اسفراین",
          "دانشگاه علوم پزشکی اصفهان",
          "دانشگاه علوم پزشکی البرز",
          "دانشگاه علوم پزشکی ایران",
          "دانشگاه علوم پزشکی ایرانشهر",
          "دانشگاه علوم پزشکی ایلام",
          "دانشگاه علوم پزشکی بابل",
          "دانشگاه علوم پزشکی بقیةالله",
          "دانشگاه علوم پزشکی بم",
          "دانشگاه علوم پزشکی بوشهر",
          "دانشکده علوم پزشکی بهبهان",
          "دانشگاه علوم پزشکی بیرجند",
          "دانشگاه علوم پزشکی تبریز",
          "دانشکده علوم پزشکی تربت جام",
          "دانشگاه علوم پزشکی تربت حیدریه",
          "دانشگاه علوم پزشکی تهران",
          "دانشگاه علوم پزشکی جندی‌شاپور",
          "دانشگاه علوم پزشکی جهرم",
          "دانشگاه علوم پزشکی جیرفت",
          "دانشگاه علوم پزشکی خراسان شمالی",
          "دانشکده علوم پزشکی خلخال",
          "دانشکده علوم پزشکی خمین",
          "دانشکده علوم پزشکی خوی",
          "دانشگاه علوم پزشکی دزفول",
          "دانشگاه علوم پزشکی رفسنجان",
          "دانشگاه علوم پزشکی زابل",
          "دانشگاه علوم پزشکی زاهدان",
          "دانشگاه علوم پزشکی زنجان",
          "دانشکده علوم پزشکی ساوه",
          "دانشگاه علوم پزشکی سبزوار",
          "دانشکده علوم پزشکی سراب",
          "دانشگاه علوم پزشکی سمنان",
          "دانشکده علوم پزشکی سیرجان",
          "دانشگاه علوم پزشکی شاهد",
          "دانشگاه علوم پزشکی شاهرود",
          "دانشگاه علوم پزشکی شهرکرد",
          "دانشگاه علوم پزشکی شهید بهشتی",
          "دانشگاه علوم پزشکی شهید صدوقی",
          "دانشکده علوم پزشکی شوشتر",
          "دانشگاه علوم پزشکی شیراز",
          "دانشگاه علوم پزشکی فسا",
          "دانشگاه علوم پزشکی قزوین",
          "دانشگاه علوم پزشکی قم",
          "دانشگاه علوم پزشکی کاشان",
          "دانشگاه علوم پزشکی کردستان",
          "دانشگاه علوم پزشکی کرمان",
          "دانشگاه علوم پزشکی کرمانشاه",
          "دانشکده علوم پزشکی گراش",
          "دانشگاه علوم پزشکی گلستان",
          "دانشگاه علوم پزشکی گناباد",
          "دانشگاه علوم پزشکی گیلان",
          "دانشکده علوم پزشکی لارستان",
          "دانشگاه علوم پزشکی لرستان",
          "دانشگاه علوم پزشکی مازندران",
          "دانشکده علوم پزشکی مراغه",
          "دانشگاه علوم پزشکی مشهد",
          "دانشکده علوم پزشکی نیشابور",
          "دانشگاه علوم پزشکی هرمزگان",
          "دانشگاه علوم پزشکی همدان",
          "دانشگاه علوم پزشکی یاسوج",
          "دانشگاه افسری امام علی",
          "دانشگاه علوم و معارف قرآن کریم دانشگاه علوم قرآنی",
          "دانشگاه امام صادق",
          "دانشگاه جامع امام حسین",
          "دانشکده پست و مخابرات ایران",
          "دانشگاه شهید مطهری،",
          "دانشکده صدا و سیما",
          "دانشگاه صنایع و معادن ایران",
          "دانشگاه صنعت نفت",
          "دانشگاه صنعتی اردبیل",
          "دانشگاه صنعتی سیستان و بلوچستان",
          "دانشگاه صنعتی مالک اشتر",
          "دانشگاه علوم انتظامی امین",
          "دانشکده علوم سیاسی و، فرهنگ و ارتباطات شهید محلاتی (ره)",
          "دانشکده علوم قضایی و خدمات اداری",
          "دانشگاه علوم کشاورزی و منابع طبیعی ساری",
          "دانشگاه علوم وفنون فارابی",
          "دانشگاه مذاهب اسلامی",
          "دانشگاه هوایی شهید ستاری",
          "دانشکده فنی شهید شمسی پور",
          "دانشکده فنی امام خمینی (ره) سبزوار",
          "آموزشکده آمار و انفورماتیک",
          "آموزشکده فنی پسران اراک",
          "آموزشکده فنی پسران علی آبادکتول",
          "آموزشکده فنی پسران گلپایگان",
          "آموزشکده فنی علی ابن ابیطالب بم",
          "آموزشکده فنی مهندسی ایلام",
          "آموزشکده فنی پسران دزفول (دکتر عصاریان)",
          "آموزشکده محیط زیست کرج",
          "دانشگاه امام باقر",
          "دانشکده تربیت دبیر فنی صومعه سرا",
          "دانشکده حفاظت و بهداشت کار",
          "دانشکده صنایع مخابرات ایران (شیراز)",
          "دانشکده علمی کاربردی پست و مخابرات",
          "دانشکده فنی انقلاب اسلامی",
          "دانشکده فنی پسران نیشابور",
          "دانشکده فنی دکتر شریعتی",
          "دانشکده فنی ولیعصر (عج) تهران",
          "دانشکده فنی ملاصدرا رامسر",
          "دانشکده فنی مهندسی ثامن الحجج (ع) مشهد",
          "دانشکده فنی مهندسی شهید محمد منتظری مشهد",
          "دانشکده فنی مهندسی علی‌آباد کتول",
          "دانشکده فنی شهید مهاجر",
          "پژوهشکده محیط زیست و توسعه پایدار",
          "دانشکده کشاورزی شهید رجایی نیشابور",
          "دانشکده کشاورزی و دامپروری تربت جام",
          "دانشکده و آموزشکده دختران آمل",
          "مرکز آموزش عالی تربیت مربی عقیدتی سیاسی",
          "مرکز آموزش عالی فنی الغدیر زنجان",
          "مرکز بین‌المللی علوم و تکنولوژی پیشرفته و علوم محیطی کرمان",
          "دانشگاه آزاد اسلامی آبادان",
          "دانشگاه آزاد اسلامی آباده",
          "دانشگاه آزاد اسلامی آبدانان",
          "دانشگاه آزاد اسلامی ابرکوه",
          "دانشگاه آزاد اسلامی ابهر",
          "دانشگاه آزاد اسلامی اراک",
          "دانشگاه آزاد اسلامی اردبیل",
          "دانشگاه آزاد اسلامی ارسنجان",
          "دانشگاه آزاد اسلامی ارومیه",
          "دانشگاه آزاد اسلامی آزادشهر",
          "دانشگاه آزاد اسلامی استهبان",
          "دانشگاه آزاد اسلامی اسفراین",
          "دانشگاه آزاد اسلامی اسکو",
          "دانشگاه آزاد اسلامی اسلامشهر",
          "دانشگاه آزاد اسلامی آشتیان",
          "دانشگاه آزاد اسلامی اقلید",
          "دانشگاه آزاد اسلامی الیگودرز",
          "دانشگاه آزاد اسلامی امیدیه",
          "دانشگاه آزاد اسلامی اوز",
          "دانشگاه آزاد اسلامی اهر",
          "دانشگاه آزاد اسلامی واحد اهواز",
          "دانشگاه آزاد اسلامی واحد آیت‌الله آملی",
          "دانشگاه آزاد اسلامی ایذه",
          "دانشگاه آزاد اسلامی ایلام",
          "دانشگاه آزاد اسلامی ایلخچی",
          "دانشگاه آزاد اسلامی بافت",
          "دانشگاه آزاد اسلامی بابل",
          "دانشگاه آزاد اسلامی بجنورد",
          "دانشگاه آزاد اسلامی واحد بردسکن",
          "دانشگاه آزاد اسلامی بروجرد",
          "دانشگاه آزاد اسلامی بندرانزلی",
          "دانشگاه آزاد اسلامی بندرگز",
          "دانشگاه آزاد اسلامی بوئین زهرا",
          "دانشگاه آزاد اسلامی بهارستان",
          "دانشگاه آزاد اسلامی بهبهان",
          "دانشگاه آزاد اسلامی بهشهر",
          "دانشگاه آزاد اسلامی بیرجند",
          "دانشگاه آزاد اسلامی پردیس",
          "دانشگاه آزاد اسلامی پارس‌آباد",
          "دانشگاه آزاد اسلامی پرند",
          "دانشگاه آزاد اسلامی تاکستان",
          "دانشگاه آزاد اسلامی تبریز",
          "دانشگاه آزاد اسلامی تربت حیدریه",
          "دانشگاه آزاد اسلامی تفرش",
          "دانشگاه آزاد اسلامی تنکابن",
          "دانشگاه آزاد اسلامی تویسرکان",
          "دانشگاه آزاد اسلامی واحد پزشکی تهران",
          "دانشگاه آزاد اسلامی واحد تهران مرکزی",
          "دانشگاه آزاد اسلامی واحد تهران غرب",
          "دانشگاه آزاد اسلامی واحد تهران شرق",
          "دانشگاه آزاد اسلامی واحد رشت",
          "دانشگاه آزاد اسلامی واحد تهران شمال",
          "دانشگاه آزاد اسلامی واحد علوم و تحقیقات تهران",
          "دانشگاه آزاد اسلامی واحد تهران جنوب",
          "دانشگاه آزاد اسلامی واحد تیران",
          "دانشگاه آزاد اسلامی واحد جویبار",
          "دانشگاه آزاد اسلامی واحد جهرم",
          "دانشگاه آزاد اسلامی واحد جیرفت",
          "دانشگاه آزاد اسلامی واحد چالوس",
          "دانشگاه آزاد اسلامی واحد خدابنده",
          "دانشگاه آزاد اسلامی خرم‌آباد",
          "دانشگاه آزاد اسلامی خوراسگان",
          "دانشگاه آزاد اسلامی واحد خوی",
          "دانشگاه آزاد اسلامی داراب",
          "دانشگاه آزاد اسلامی دامغاندانشگاه آزاد اسلامی دولت‌آباد",
          "دانشگاه آزاد اسلامی دورود",
          "دانشگاه آزاد اسلامی دهاقان",
          "دانشگاه آزاد اسلامی دهلران",
          "دانشگاه آزاد اسلامی رامهرمز",
          "دانشگاه آزاد اسلامی رودهن",
          "دانشگاه آزاد اسلامی واحد زرقان",
          "دانشگاه آزاد اسلامی زنجان",
          "دانشگاه آزاد اسلامی ساری",
          "دانشگاه آزاد اسلامی ساوه",
          "دانشگاه آزاد اسلامی سبزوار",
          "دانشگاه آزاد اسلامی سپیدان",
          "دانشگاه آزاد اسلامی سروستان",
          "دانشگاه آزاد اسلامی سلماس",
          "دانشگاه آزاد اسلامی سمنان",
          "دانشگاه آزاد اسلامی سنقر",
          "دانشگاه آزاد اسلامی سنندج",
          "دانشگاه آزاد اسلامی سوادکوه",
          "دانشگاه آزاد اسلامی شاهرود",
          "دانشگاه آزاد اسلامی شبستر",
          "دانشگاه آزاد اسلامی شوشتر",
          "دانشگاه آزاد اسلامی شهرری",
          "دانشگاه آزاد اسلامی شهرضا",
          "دانشگاه آزاد اسلامی شهر مجلسی",
          "دانشگاه آزاد اسلامی شهر قدس",
          "دانشگاه آزاد اسلامی واحد شهریار",
          "دانشگاه آزاد اسلامی شیراز",
          "دانشگاه آزاد اسلامی شیروان",
          "دانشگاه آزاد اسلامی علی‌آباد کتول",
          "دانشگاه آزاد اسلامی فسا",
          "دانشگاه آزاد اسلامی فردوس",
          "دانشگاه آزاد اسلامی فیروزآباد",
          "دانشگاه آزاد اسلامی فیروزکوه",
          "دانشگاه آزاد اسلامی قائمشهر",
          "دانشگاه آزاد اسلامی قزوین",
          "دانشگاه آزاد اسلامی واحد قم",
          "دانشگاه آزاد اسلامی واحد علوم پزشکی قم",
          "دانشگاه آزاد اسلامی کاشان",
          "دانشگاه آزاد اسلامی کازرون",
          "دانشگاه آزاد اسلامی کرج",
          "دانشگاه آزاد اسلامی کرمان",
          "دانشگاه آزاد اسلامی کرمانشاه",
          "دانشگاه آزاد اسلامی گرگان",
          "دانشگاه آزاد اسلامی واحد گرمسار",
          "دانشگاه آزاد اسلامی واحد گناباد",
          "دانشگاه آزاد اسلامی گنبدکاووس",
          "دانشگاه آزاد اسلامی لارستان",
          "دانشگاه آزاد اسلامی لاهیجان",
          "دانشگاه آزاد اسلامی لامرد",
          "دانشگاه آزاد اسلامی ماکو",
          "دانشگاه آزاد اسلامی مرودشت",
          "دانشگاه آزاد اسلامی واحد ملایر",
          "دانشگاه آزاد اسلامی واحد ملارد",
          "دانشگاه آزاد اسلامی مسجدسلیمان",
          "دانشگاه آزاد اسلامی مشهد",
          "دانشگاه آزاد اسلامی واحد ممقان",
          "دانشگاه آزاد اسلامی واحد مهاباد",
          "دانشگاه آزاد اسلامی مهدی‌شهر",
          "دانشگاه آزاد اسلامی واحد میانه",
          "دانشگاه آزاد اسلامی میبد",
          "دانشگاه آزاد اسلامی نجف آباد",
          "دانشگاه آزاد اسلامی مرکز بین‌المللی خلیج فارس",
          "دانشگاه آزاد اسلامی نراق",
          "دانشگاه آزاد اسلامی واحد نهاوند",
          "دانشگاه آزاد اسلامی واحد نور",
          "دانشگاه آزاد اسلامی واحد نوشهر",
          "دانشگاه آزاد اسلامی نی‌ریز",
          "دانشگاه آزاد اسلامی نیشابور",
          "دانشگاه آزاد اسلامی ورامین و پیشوا",
          "دانشگاه آزاد اسلامی واحد هرند (اصفهان)",
          "دانشگاه آزاد اسلامی همدان",
          "دانشگاه آزاد اسلامی هیدج",
          "دانشگاه آزاد اسلامی واحد یاسوج",
          "دانشگاه آزاد اسلامی واحد یزد"
        ]
      },
      {
        type: "text",
        isRequired: true,
        name: "CityName",
        hasNone: true,
        title: {
          default: "",
          fa: "لطفا شهر محل زندگی‌تان را وارد کنید.",
        },
      },

    ],
  },
  {
    name: "MajorInEducation",
    elements: [
      {
        type: "radiogroup",
        isRequired: true,
        title: {
          default: "MajorInEducation",
          fa: "لطفا شاخه تحصیلی خود را انتخاب کنید.",
        },
        name: "MajorForEducation",
        choices: [

          {
            value: "Humanities",
            text: {
              default: "",
              fa: "علوم انسانی(روانشناسی، جامعه شناسی و غیره)",
            },
          },
          {
            value: "ECE",
            text: {
              default: "",
              fa: " برق و علوم کامپیوتر",
            },
          },
          {
            value: "FundamentalSciences",
            text: {
              default: "",
              fa: "علوم پایه(ریاضیات، فیزیک و غیره)",
            },
          },
          {
            value: "Engineering",
            text: {
              default: "",
              fa: "مهندسی غیر از برق و کامپیوتر",
            },
          },
          {
            value: "ArtLiterature",
            text: {
              default: "",
              fa: "هنر و ادبیات",
            },
          },
          {
            value: "Management",
            text: {
              default: "",
              fa: "رشته‌های مدیریت(مدیریت، کارآفرینی،اقتصاد، حسابداری و غیره)",
            },
          },
          {
            value: "Sport",
            text: {
              default: "",
              fa: "رشته‌های تربیت بدنی",
            },
          },
          {
            value: "Other",
            text: {
              default: "",
              fa: "موارد دیگر",
            },
          },
        ],
      },
    ],
  },
  {
    name: "JobSatisfaction",
    elements: [
      {
        type: "radiogroup",
        title: {
          default: "JobSatisfaction",
          fa: "لطفا یکی از موارد زیر را انتخاب کنید.",
        },
        name: "JobSatisfaction",
        isRequired: true,
        choices: [

          {
            value: "EmployedAndSatisfied",
            text: {
              default: "",
              fa: "شاغل هستم و از درآمدم راضی‌ام",
            },
          },
          {
            value: "EmployedAndNotSatisfied",
            text: {
              default: "",
              fa: "شاغل هستم و از درآمدم ناراضی‌ام",
            },
          }, {
            value: "EmployedAndNotSatisfied",
            text: {
              default: "",
              fa: "شاغل هستم با وجود اینکه نیاز مالی ندارم",
            },
          },
          {
            value: "UnEmployedAndSatisfied",
            text: {
              default: "",
              fa: "شاغل نیستم و نیاز مالی هم ندارم",
            },
          }, {
            value: "UnEmployedAndNotSatisfied",
            text: {
              default: "",
              fa: "شاغل نیستم و نیاز مالی دارم",
            },
          }, {
            value: "UnAnswered",
            text: {
              default: "",
              fa: "مایل به پاسخ نیستم",
            },
          },
        ],
      }, {

        type: "text",
        name: "JobTitle",
        title: {
          default: "",
          fa: "لطفا در صورت تمایل عنوان شغلی که دارید را وارد کنید.",
        },
      },
    ]
  },
  {
    name: "TotalQualityOfLife",
    elements: [
      {
        type: "radiogroup",
        name: "TotalQualityOfLife",
        isRequired: true,
        title: {
          default: "How would you rate your quality of life?",
          fa:
            "<nazlifont>" +
            "در کل کیفیت زندگی خود را چگونه ارزیابی میکنید؟" +
            "</nazlifont>",
        },
        choices: [
          {
            value: "1",
            text: {
              default: "Very poor",
              fa: "<nazlifont>" + "خیلی بد" + "</nazlifont>",
            },
          },
          {
            value: "2",
            text: {
              default: "Poor",
              fa: "<nazlifont>" + "بد" + "</nazlifont>",
            },
          },
          {
            value: "3",
            text: {
              default: "Neither poor nor good",
              fa: "<nazlifont>" + "نه بد و نه خوب" + "</nazlifont>",
            },
          },
          {
            value: "4",
            text: {
              default: "Good",
              fa: "<nazlifont>" + "خوب" + "</nazlifont>",
            },
          },
          {
            value: "5",
            text: {
              default: "Very good",
              fa: "<nazlifont>" + "خیلی خوب" + "</nazlifont>",
            },
          },
        ],
      },
    ],
    description: {
      default:
        "Please choose the answer that appears most appropriate. If you are unsure about which response to give to a question, the first response you think of is often the best one.Please keep in mind your standards, hopes, pleasures and concerns. We ask that you think about your life in the last four weeks.",
      fa:
        "<nazlifont>" +
        " لطفاً پاسخی که از نظر شما مناسب‌تر است را انتخاب کنید." +
        "<br />" +
        "اگر در پاسخ به سوالی تردید دارید، اولین پاسخی که به ذهن تان می‌رسد را انتخاب کنید." +
        "<br />" +
        " لطفاً به سوالات زیر با توجه به شرایط زندگی‌تان در" +
        "<red>" +
        // "<underlinemarkdown>" +
        "یک هفته اخیر" +
        // "</underlinemarkdown>" +
        "</red>" +
        " پاسخ دهید." +
        "</nazlifont>",
    },
  }
  ,
  {
    name: "saftypage",
    elements: [
      {
        type: "radiogroup",
        name: "SaftyInLifeQuestion",
        title: {
          default: "How safe do you feel in your daily life?",
          fa:
            "در زندگی روزمره خود چقدر احساس امنیت و آرامش میکنید؟",
        },
        choices: [
          {
            value: "1",
            text: {
              default: "Not at all",
              fa: "<nazlifont>" + "اصلاً" + "</nazlifont>",
            },
          },
          {
            value: "2",
            text: {
              default: "A little",
              fa: "<nazlifont>" + "کم" + "</nazlifont>",
            },
          },
          {
            value: "3",
            text: {
              default: "A moderate amount",
              fa: "<nazlifont>" + "متوسط" + "</nazlifont>",
            },
          },
          {
            value: "4",
            text: {
              default: "Very much",
              fa: "<nazlifont>" + "خیلی زیاد" + "</nazlifont>",
            },
          },
          {
            value: "5",
            text: {
              default: "Extremely",
              fa: "<nazlifont>" + "به شدت" + "</nazlifont>",
            },
          },
        ],
      },
    ],
  },
  {
    name: "moneypage",
    elements: [
      {
        type: "radiogroup",
        name: "MoneyQuestion",
        isRequired: true,
        title: {
          default: "Have you enough money to meet your needs?",
          fa:
            "<nazlifont>" +
            "آیا برای رفع نیازهای خود پول کافی دارید؟" +
            "</nazlifont>",
        },
        choices: [
          {
            value: "1",
            text: {
              default: "Not at all",
              fa: "<nazlifont>" + "اصلاً" + "</nazlifont>",
            },
          },
          {
            value: "2",
            text: {
              default: "A little",
              fa: "<nazlifont>" + "در حد کم" + "</nazlifont>",
            },
          },
          {
            value: "3",
            text: {
              default: "Moderately",
              fa: "<nazlifont>" + "در حد متوسط" + "</nazlifont>",
            },
          },
          {
            value: "4",
            text: {
              default: "Mostly",
              fa: "<nazlifont>" + "در حد زیاد" + "</nazlifont>",
            },
          },
          {
            value: "5",
            text: {
              default: "Completely",
              fa: "<nazlifont>" + "به طور کامل" + "</nazlifont>",
            },
          },
        ],
      },
    ],
  },
  {
    name: "InformationQuestion",
    elements: [
      {
        type: "radiogroup",
        name: "InformationQuestion",
        isRequired: true,
        title: {
          default:
            "How available to you is the information that you need in your day-to-day life?",
          fa:
            "<nazlifont>" +
            "اطلاعات مورد نیاز روزمره به چه میزان در دسترس شماست؟" +
            "</nazlifont>",
        },
        choices: [
          {
            value: "1",
            text: {
              default: "Not at all",
              fa: "<nazlifont>" + "اصلاً" + "</nazlifont>",
            },
          },
          {
            value: "2",
            text: {
              default: "A little",
              fa: "<nazlifont>" + "در حد کم" + "</nazlifont>",
            },
          },
          {
            value: "3",
            text: {
              default: "Moderately",
              fa: "<nazlifont>" + "در حد متوسط" + "</nazlifont>",
            },
          },
          {
            value: "4",
            text: {
              default: "Mostly",
              fa: "<nazlifont>" + "در حد زیاد" + "</nazlifont>",
            },
          },
          {
            value: "5",
            text: {
              default: "Completely",
              fa: "<nazlifont>" + "به طور کامل" + "</nazlifont>",
            },
          },
        ],
      },
    ],
  },
  {
    name: "MentalHealthQuestion",
    elements: [
      {
        type: "radiogroup",
        name: "MentalHealthQuestion",
        title: {
          default:
            "How often do you have negative feelings such as blue mood, despair, anxiety, depression?",
          fa:
            "<nazlifont>" +
            "چه مقدار دچار احساسات منفی مانند: خلق پایین، نا امیدی، اضطراب و افسردگی می شوید؟" +
            "</nazlifont>",
        },
        choices: [
          {
            value: "5",
            text: {
              default: "Never",
              fa: "<nazlifont>" + "هیچوقت" + "</nazlifont>",
            },
          },
          {
            value: "4",
            text: {
              default: "Seldom",
              fa: "<nazlifont>" + "به ندرت" + "</nazlifont>",
            },
          },
          {
            value: "3",
            text: {
              default: "Quite often",
              fa: "<nazlifont>" + "بعضی اوقات" + "</nazlifont>",
            },
          },
          {
            value: "2",
            text: {
              default: "Very often",
              fa: "<nazlifont>" + "خیلی وقتها" + "</nazlifont>",
            },
          },
          {
            value: "1",
            text: {
              default: "Always",
              fa: "<nazlifont>" + "همیشه" + "</nazlifont>",
            },
          },
        ],
      },
    ],
    description: {
      default:
        "The following question refers to how often you have felt or experienced certain things in the last four weeks.",
      fa:
        "سوال زیر درباره احساس یا تجربه شما در  " +
        "<red>" +
        // "<underlinemarkdown>" +
        " چهار هفته اخیر " +
        // "</underlinemarkdown>" +
        "</red>" +
        " است.",
    },
  },
  {
    name: "RelationshipStatus",
    elements: [
      {
        type: "radiogroup",
        name: "RelationshipStatus",
        title: {
          default:
            "",
          fa:

            "لطفا یکی از گزینه های زیر را انتخاب کنید:"
          ,
        },
        choices: [
          {
            value: "InRelationship",
            text: {
              default: "",
              fa: " ازدواج کرده‌ام یا در رابطه عاطفی هستم",
            },
          },
          {
            value: "Single",
            text: {
              default: "",
              fa: "ازدواج نکرده‌ام و در رابطه عاطفی هم نیستم",
            },
          },
          {
            value: "NoAnswer",
            text: {
              default: "",
              fa: "ترجیح می دهم نگویم",
            },
          },
          {
            value: "OneWayLove",
            text: {
              default: "",
              fa: "کسی را دوست دارم اما رابطه عاطفی نداریم",
            },
          },
          {
            value: "MultiPartner",
            text: {
              default: "",
              fa: "دارای روابط غیر پایدار هستم",
            },
          },
        ],
      },
    ],
  },
  {
    name: "socialqualitypage-SexLifeQuestion",
    elements: [
      {
        type: "radiogroup",
        name: "SexLifeQuestion",
        title: {
          default: "How satisfied are you with your sex life?",
          fa:
            "<nazlifont>" +
            "چقدر از روابط جنسی خود رضایت دارید؟" +
            "</nazlifont>",
        },
        choices: [
          {
            value: "00",
            text: {
              default: "Reject to answer",
              fa: "<nazlifont>" + "روابط جنسی ندارم" + "</nazlifont>",
            },
          },
          {
            value: "0",
            text: {
              default: "Reject to answer",
              fa: "<nazlifont>" + "مایل به پاسخگویی نیستم" + "</nazlifont>",
            },
          },
          {
            value: "1",
            text: {
              default: "Very dissatisfied",
              fa: "<nazlifont>" + "کاملاً ناراضی" + "</nazlifont>",
            },
          },
          {
            value: "2",
            text: {
              default: "Dissatisfied",
              fa: "<nazlifont>" + "ناراضی" + "</nazlifont>",
            },
          },
          {
            value: "3",
            text: {
              default: "Neither satisfied nor dissatisfied",
              fa: "<nazlifont>" + "نه ناراضی و نه راضی" + "</nazlifont>",
            },
          },
          {
            value: "4",
            text: {
              default: "Satisfied",
              fa: "<nazlifont>" + "راضی" + "</nazlifont>",
            },
          },
          {
            value: "5",
            text: {
              fa: "<nazlifont>" + "خیلی راضی" + "</nazlifont>",
            },
          },
        ],
      },
    ],
  },
  {
    name: "ّImportanceOfScience",
    elements: [
      {
        type: "radiogroup",
        name: "ّImportanceOfScience",
        title: {
          default:
            "",
          fa:

            "انجام پژوهش‌ های علمی را چقدر مفید می‌دانید؟"
          ,
        },
        choices: [
          {
            value: "4",
            text: {
              default: "",
              fa: "خیلی مفید است",
            },
          },
          {
            value: "3",
            text: {
              default: "",
              fa: "نسبتا مفید است",
            },
          },
          {
            value: "2",
            text: {
              default: "",
              fa: "کم مفید است",
            },
          },
          {
            value: "1",
            text: {
              default: "",
              fa: "خیلی کم مفید است",
            },
          },
          {
            value: "0",
            text: {
              default: "",
              fa: "اصلا مفید نیست",
            },
          },
        ],
      },
    ],
  },
];

// const auctionQuestionsShuffled = auctionQuestionsUnshuffled
//   .map((value) => ({ value, sort: Math.random() }))
//   .sort((a, b) => a.sort - b.sort)
//   .map(({ value }) => value);
const auctionQuestionsShuffled = auctionQuestionsUnshuffled;
var json = {
  pages: [
    {
      name: "InterventionQuestionnaire",
      elements: [
        {
          type: "radiogroup",
          name: "AuctionsAgreement",
          title:
            "لطفا به سوالاتی که در این بخش آمده، پاسخ دهید." +
            markdownNewline,
          choices: ["آماده انجام این بخش هستم."],
          isRequired: isRequiredForAllQuestions,
          requiredErrorText:
            "ادامه آزمایش نیاز به علامت زدن گزینه و تایید شما دارد.",
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
  questionTitlePattern: "Title",
  requiredText: "",
};
class InterventionQuestionnaire extends React.Component {
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
      InterventionQuestionnaireData: { ...survey.data },
      SubmitTimeForInterventionQuestionnaire: dateTime,
      timestampsforoptionchange: survey.timestampsoptions,

    };
    this.props.editParticipant(this.props.match.params.id, {
      InterventionQuestionnaire: { ...survey.data },
    });
    this.props.editParticipantGermany(this.props.match.params.id, {
      InterventionQuestionnaire: { ...survey.data },
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
    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        locale={"fa"}
        model={model}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
        onCurrentPageChanged={timerCallback()}
        // onUpdateQuestionCssClasses={this.onUpdateQuestionCssClasses}
        applyTheme="defaul"
      />
    ) : null;
    var onCompleteComponent = null;
    // var onCompleteComponent = this.state.isCompleted ? (
    //   <SurveyFinalPage nextPage={`${this.props.nextPage}${this.getUserId()}`} />
    // ) : null;
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
  withRouter(InterventionQuestionnaire)
);
