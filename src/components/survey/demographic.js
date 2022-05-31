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
      fa: "مشخصات",
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
            name: "nameandfamilyname",
            title: {
              default: "Name and Family name",
              fa: "نام و نام خانوادگی",
            },
            items: [
              {
                name: "sirname",
                title: {
                  default: "Name",
                  fa: "نام",
                },
              },
              {
                name: "familyname",
                title: {
                  default: "Family Name",
                  fa: "نام خانوادگی",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "sexuality",
            title: {
              default: "Sex",
              fa: "جنسیت",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Female",
                  fa: "مونث",
                },
              },
              {
                value: "2",
                text: {
                  default: "Male",
                  fa: "مذکر",
                },
              },
            ],
          },
          {
            type: "dropdown",
            name: "age",
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
            ],
          },
        ],
      },
      {
        name: "educationpage",
        elements: [
          {
            type: "radiogroup",
            name: "education",
            title: {
              default: "Education",
              fa: "میزان تحصیلات",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "High school diploma",
                  fa: "دیپلم",
                },
              },
              {
                value: "2",
                text: {
                  default: "College",
                  fa: " کارشناسی یا دانشجوی کارشناسی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Post graduate",
                  fa: "کارشناسی ارشد یا دانشجوی کارشناسی ارشد",
                },
              },
              {
                value: "4",
                text: {
                  default: "Phd or higher",
                  fa: "دانشجوی دکترا، دکترا یا بالاتر",
                },
              },
            ],
          },
        ],
      },
      {
        name: "totalqualityoflifepage",
        elements: [
          {
            type: "radiogroup",
            name: "totalqualityoflifequestion",
            title: {
              default: "How would you rate your quality of life?",
              fa: "در کل کیفیت زندگی خود را چگونه ارزیابی میکنید؟",
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
          fa: " لطفاً پاسخی که از نظر شما مناسب\u00adتر است را انتخاب کنید. اگر در پاسخ به سوالی تردید دارید، اولین پاسخی که به ذهن\u00adتان می\u00adرسد را انتخاب کنید. لطفاً به سوالات زیر با توجه به شرایط زندگی\u00adتان در یک هفته اخیر پاسخ دهید.",
        },
      },
      {
        name: "socialqualitypage",
        elements: [
          {
            type: "radiogroup",
            name: "personalrelatonshipsquestion",
            title: {
              default:
                "How satisfied are you with your personal relationships?",
              fa: "چقدر از روابط اجتماعی تان با دیگران رضایت دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very dissatisfied",
                  fa: "کاملاً ناراضی",
                },
              },
              {
                value: "2",
                text: {
                  default: "Dissatisfied",
                  fa: "ناراضی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither satisfied nor dissatisfied",
                  fa: "نه ناراضی و نه راضی",
                },
              },
              {
                value: "4",
                text: {
                  default: "Satisfied",
                  fa: "راضی",
                },
              },
              {
                value: "5",
                text: {
                  default: "Very satisfied",
                  fa: "خیلی راضی",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "sexlifequestion",
            title: {
              default: "How satisfied are you with your sex life?",
              fa: "چقدر از روابط جنسی خود رضایت دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very dissatisfied",
                  fa: "کاملاً ناراضی",
                },
              },
              {
                value: "2",
                text: {
                  default: "Dissatisfied",
                  fa: "ناراضی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither satisfied nor dissatisfied",
                  fa: "نه ناراضی و نه راضی",
                },
              },
              {
                value: "4",
                text: {
                  default: "Satisfied",
                  fa: "راضی",
                },
              },
              {
                value: "5",
                text: {
                  fa: "خیلی راضی",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "friendssupprtquestion",
            title: {
              default:
                "How satisfied are you with the support you get from your friends?",
              fa: "چقدر از حمایت دوستان و آشنایان خود راضی هستید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very dissatisfied",
                  fa: "کاملاً ناراضی",
                },
              },
              {
                value: "2",
                text: {
                  default: "Dissatisfied",
                  fa: "ناراضی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither satisfied nor dissatisfied",
                  fa: "نه ناراضی و نه راضی",
                },
              },
              {
                value: "4",
                text: {
                  default: "Satisfied",
                  fa: "راضی",
                },
              },
              {
                value: "5",
                text: {
                  default: "Very satisfied",
                  fa: "خیلی راضی",
                },
              },
            ],
          },
        ],
        description: {
          default:
            "The following questions ask about how completely you experience or were able to do certain things in the last four weeks.",
          fa: "سوالات زیر تجربیات و توانایی شما در انجام دادن کارهای خاصی در طول چهار هفته اخیر را میسنجد.",
        },
      },
      {
        name: "saftypage",
        elements: [
          {
            type: "radiogroup",
            name: "saftyinlifequestion",
            title: {
              default: "How safe do you feel in your daily life?",
              fa: "در زندگی روزمره خود چقدر احساس امنیت و آرامش میکنید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Not at all",
                  fa: "اصلاً",
                },
              },
              {
                value: "2",
                text: {
                  default: "A little",
                  fa: "کم",
                },
              },
              {
                value: "3",
                text: {
                  default: "A moderate amount",
                  fa: "متوسط",
                },
              },
              {
                value: "4",
                text: {
                  default: "Very much",
                  fa: "خیلی زیاد",
                },
              },
              {
                value: "5",
                text: {
                  default: "Extremely",
                  fa: "به شدت",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "healthenvironmentquestion",
            title: {
              default: "How healthy is your physical environment?",
              fa: "محیط اطراف  شما، تا چه حد سالم و بهداشتی است؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Not at all",
                  fa: "اصلاً",
                },
              },
              {
                value: "2",
                text: {
                  default: "A little",
                  fa: "کم",
                },
              },
              {
                value: "3",
                text: {
                  default: "A moderate amount",
                  fa: "متوسط",
                },
              },
              {
                value: "4",
                text: {
                  default: "Very much",
                  fa: "خیلی زیاد",
                },
              },
              {
                value: "5",
                text: {
                  default: "Extremely",
                  fa: "به شدت",
                },
              },
            ],
          },
        ],
        description: {
          default:
            "The following questions ask about how much you have experienced certain things in the lastfour weeks.",
          fa: "سوالات زیر درباره این است که در چهار هفته اخیر تا چه حد برخی چیزها را تجربه کرده اید.",
        },
      },
      {
        name: "moneypage",
        elements: [
          {
            type: "radiogroup",
            name: "moneyquestion",
            title: {
              default: "Have you enough money to meet your needs?",
              fa: "آیا برای رفع نیازهای خود پول کافی دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Not at all",
                  fa: "اصلاً",
                },
              },
              {
                value: "2",
                text: {
                  default: "A little",
                  fa: "در حد کم",
                },
              },
              {
                value: "3",
                text: {
                  default: "Moderately",
                  fa: "در حد متوسط",
                },
              },
              {
                value: "4",
                text: {
                  default: "Mostly",
                  fa: "در حد زیاد",
                },
              },
              {
                value: "5",
                text: {
                  default: "Completely",
                  fa: "به طور کامل",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "informationquestion",
            title: {
              default:
                "How available to you is the information that you need in your day-to-day life?",
              fa: "اطلاعات مورد نیاز روزمره به چه میزان در دسترس شماست؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Not at all",
                  fa: "اصلاً",
                },
              },
              {
                value: "2",
                text: {
                  default: "A little",
                  fa: "در حد کم",
                },
              },
              {
                value: "3",
                text: {
                  default: "Moderately",
                  fa: "در حد متوسط",
                },
              },
              {
                value: "4",
                text: {
                  default: "Mostly",
                  fa: "در حد زیاد",
                },
              },
              {
                value: "5",
                text: {
                  default: "Completely",
                  fa: "به طور کامل",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "leisurequestion",
            title: {
              default:
                "To what extent do you have the opportunity for leisure activities?",
              fa: "به چه میزان امکان فعالیتهای تفریحی را دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Not at all",
                  fa: "اصلاً",
                },
              },
              {
                value: "2",
                text: {
                  default: "A little",
                  fa: "در حد کم",
                },
              },
              {
                value: "3",
                text: {
                  default: "Moderately",
                  fa: "در حد متوسط",
                },
              },
              {
                value: "4",
                text: {
                  default: "Mostly",
                  fa: "در حد زیاد",
                },
              },
              {
                value: "5",
                text: {
                  default: "Completely",
                  fa: "به طور کامل",
                },
              },
            ],
          },
        ],
        description: {
          default:
            "The following questions ask about how completely you experience or were able to do certain things in the last four weeks.",
          fa: "سوالات زیر تجربیات و توانایی شما در انجام دادن کارهای خاصی در طول چهار هفته اخیر را میسنجد.",
        },
      },
      {
        name: "livingplaceconditionspage",
        elements: [
          {
            type: "radiogroup",
            name: "livingplaceconditionsquestion",
            title: {
              default:
                "How satisfied are you with the conditions of your living place?",
              fa: "چقدر از شرایط محل زندگی خود رضایت دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very dissatisfied",
                  fa: "کاملاً ناراضی",
                },
              },
              {
                value: "2",
                text: {
                  default: "Dissatisfied",
                  fa: "ناراضی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither satisfied nor dissatisfied",
                  fa: "نه ناراضی و نه راضی",
                },
              },
              {
                value: "4",
                text: {
                  default: "Satisfied",
                  fa: "راضی",
                },
              },
              {
                value: "5",
                text: {
                  default: "Very satisfied",
                  fa: "خیلی راضی",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "healthservicesquestion",
            title: {
              default:
                "How satisfied are you with your access to health services?",
              fa: "چقدر از دسترسی خود به خدمات بهداشتی و درمانی رضایت دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very dissatisfied",
                  fa: "کاملاً ناراضی",
                },
              },
              {
                value: "2",
                text: {
                  default: "Dissatisfied",
                  fa: "ناراضی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither satisfied nor dissatisfied",
                  fa: "نه ناراضی و نه راضی",
                },
              },
              {
                value: "4",
                text: {
                  default: "Satisfied",
                  fa: "راضی",
                },
              },
              {
                value: "5",
                text: {
                  default: "Very satisfied",
                  fa: "خیلی راضی",
                },
              },
            ],
          },
          {
            type: "radiogroup",
            name: "transportquestion",
            title: {
              default: "How satisfied are you with your transport?",
              fa: "چقدر از دسترسی به امکانات حمل و نقل و وضعیت رفت وآمد خود رضایت دارید؟",
            },
            choices: [
              {
                value: "1",
                text: {
                  default: "Very dissatisfied",
                  fa: "کاملاً ناراضی",
                },
              },
              {
                value: "2",
                text: {
                  default: "Dissatisfied",
                  fa: "ناراضی",
                },
              },
              {
                value: "3",
                text: {
                  default: "Neither satisfied nor dissatisfied",
                  fa: "نه ناراضی و نه راضی",
                },
              },
              {
                value: "4",
                text: {
                  default: "Satisfied",
                  fa: "راضی",
                },
              },
              {
                value: "5",
                text: {
                  default: "Very satisfied",
                  fa: "خیلی راضی",
                },
              },
            ],
          },
        ],
        description: {
          default:
            "The following questions ask about how completely you experience or were able to do certain things in the last four weeks.",
          fa: "سوالات زیر تجربیات و توانایی شما در انجام دادن کارهای خاصی در طول چهار هفته اخیر را میسنجد.",
        },
      },
      {
        name: "mentalhealthpage",
        elements: [
          {
            type: "radiogroup",
            name: "mentalhealthquestion",
            title: {
              default:
                "How often do you have negative feelings such as blue mood, despair, anxiety, depression?",
              fa: "چه مقدار دچار احساسات منفی مانند: خلق پایین، نا امیدی، اضطراب وافسردگی می شوید؟",
            },
            choices: [
              {
                value: "5",
                text: {
                  default: "Never",
                  fa: "هیچوقت",
                },
              },
              {
                value: "4",
                text: {
                  default: "Seldom",
                  fa: "به ندرت",
                },
              },
              {
                value: "3",
                text: {
                  default: "Quite often",
                  fa: "بعضی اوقات",
                },
              },
              {
                value: "2",
                text: {
                  default: "Very often",
                  fa: "خیلی وقتها",
                },
              },
              {
                value: "1",
                text: {
                  default: "Always",
                  fa: "همیشه",
                },
              },
            ],
          },
        ],
        description: {
          default:
            "The following question refers to how often you have felt or experienced certain things in the last four weeks.",
          fa: "سوالات زیر تجربیات و توانایی شما در انجام دادن کارهای خاصی در طول چهار هفته اخیر را میسنجد.",
        },
      },
      {
        name: "phoneandemailpage",
        elements: [
          {
            type: "multipletext",
            name: "phoneandemail",
            title: {
              default:
                "Please enter your mobile phone number and email address.",
              fa: "لطفا شماره موبایل و آدرس ایمیل خود را وارد نمایید.",
            },
            items: [
              {
                name: "phonenumber",
                title: {
                  fa: "شماره موبایل",
                  default: "Mobile number",
                },
              },
              {
                name: "emailaddress",
                title: {
                  default: "Email address",
                  fa: "ایمیل",
                },
              },
            ],
          },
        ],
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
        <p>از وقتی که دراختیار ما قرار داده‌اید، متشکریم.</p>
        <p>
          با زدن دکمه پایان می توانید وارد صفحه توضیحات مربوط به آزمایش اختلال
          اضطراب اجتماعی شوید.
        </p>

        {/* <p>
          برای آگاهی از نتایج آزمایش پیشین و همینطور نمره خود در این پرسشنامه
          دکمه زیر را بزنید.
        </p> */}
        <a href="http://aris.ut.ac.ir/sp/intro.html" className="ui button">
          پایان
        </a>
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
