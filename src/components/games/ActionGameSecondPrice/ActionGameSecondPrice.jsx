import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";
// import Nouislider from "nouislider-react";
import { Converter } from "showdown";

// import "nouislider/distribute/nouislider.css";
import "survey-react/survey.css";
// import noUiSlider from "nouislider";
// import "nouislider/distribute/nouislider.min.css";
import * as widgets from "surveyjs-widgets";
// import Inputmask from 'inputmask';
// import 'inputmask/dist/inputmask/phone-codes/phone';
// import * as widgets from 'surveyjs-widgets';
// import "jquery.inputmask"
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchParticipant, editParticipant } from "../../../actions";

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

class ActionGameSecondPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: false };

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

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
  winnerCount = 3;
  minValuation = 1;
  maxValuation = 100;
  minMaxTextTitile =
    "<red>" +
    this.minValuation +
    "</red>" +
    " تا " +
    "<red>" +
    this.maxValuation +
    "</red>";
  firstCommonLineforQuestions =
    "  فرض کنید می‌توانید به داده‌های زیر دسترسی پیدا کنید." +
    " بین" +
    this.minMaxTextTitile +
    "چه ارزشی برای آن تعیین می کنید؟" +
    "<br />";
  auctionQuestionsUnshuffled = [
    {
      name: "AGMPBidPhysicalPrivacy01", //#1
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidPhysicalPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع‌آوری شده توسط یک اپلیکشن تلفن همراه که اطلاعات" +
            "<blue>" +
            " شماره تلفن" +
            "</blue>" +
            "،" +
            "<blue>" +
            "آدرس محل زندگی" +
            "</blue>" +
            " و " +
            "<blue>" +
            "محل کار و تحصیل" +
            "</blue>" +
            " و " +
            "<blue>" +
            "زمان و مکان قرارهای ملاقات آینده" +
            "</blue>" +
            " کاربران خود را ذخیره کرده است. " +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidPhysicalPrivacy02", //#2
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidPhysicalPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "داده‌های جمع‌آوری شده توسط یک اپلیکیشن تلفن همراه " +
            "که" +
            "<blue>" +
            " اطلاعات موقعیت مکانی دقیق در طول ۲۴ ساعت" +
            "</blue>" +
            " شبانه روز کاربرانش را به همراه " +
            "<blue>" +
            "عکس صورت" +
            "</blue>" +
            " و " +
            "<blue>" +
            "ویژگی‌های فیزیکی مانند جنسیت، سن، قد و وزن" +
            "</blue>" +
            " را ذخیره کرده است." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidSocialPrivacy01", //#3
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidSocialPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع‌آوری شده توسط یک اپلیکیشن" +
            " «خاطره‌نویسی» حاوی متن خاطرات خجالت‌آور و اشتباهات گذشته افراد" +
            " به همراه نام و نام خانوادگی " +
            " شماره تلفن و ایمیل و آی دی تلگرام آن‌ها گذاشته‌اند. " +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidSocialPrivacy02", //#4
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidSocialPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع‌آوری شده توسط" +
            " یک اپلیکیشن «مشاوره» حاوی متن یادداشت‌های" +
            "کاربران از دلخوری‌ها، ناراحتی‌ها" +
            " و اختلافات بیان نشده از دوستان و اعضای خانواده آنها." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidResourceRelatedPrivacy01", //#5
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidResourceRelatedPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع‌آوری شده توسط " +
            "یک شرکت تبلیغاتی از علایق و ترجیهات" +
            " افراد در خرید محصولات و خدمات" +
            " به همراه شماره تلفن، ایمیل و آی دی تلگرام آنها." +
            " را ذخیره کرده است." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidResourceRelatedPrivacy02", //#6
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidResourceRelatedPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع‌آوری شده توسط" +
            " یک اپلیکیشن بانکی از مشخصات" +
            " حساب‌های بانکی  به همراه رمز حساب‌ها." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidPsychologicalPrivacy01", //#7
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidPsychologicalPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع آوری شده از" +
            "یک اپلیکیشن که از طریق دوربین لپتاپ و موبایل" +
            "بدون اجازه و بدون آگاهی افراد فیلم‌های " +
            "بدون صدا از زندگی روزمره آن‌ها " +
            "ضبط کرده است و فاقد مشخصاتی" +
            " مانند نام، شماره تلفن و ایمیل آن‌ها است." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidPsychologicalPrivacy02", //#8
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidPsychologicalPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های جمع آوری شده توسط" +
            " یک اپلیکیشن که حاوی یادداشت‌‌های روزانه " +
            "افراد و فاقد مشخصاتی مانند" +
            " نام،‌شماره تلفن و ایمیل آن‌ها است." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidProsecutionRelatedPrivacy01", //#9
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidProsecutionRelatedPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های یک اپلیکیشن اشتراک فیلم" +
            " که حاوی اطلاعات کاربران شامل لیست فیلم‌هایی" +
            " که افراد بدون پرداخت پول به تولید کننده" +
            " فیلم داونلود کرده‌انداست " +
            "و به همراه نام، شماره تلفن و ایمیل افراد است." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidProsecutionRelatedPrivacy02", //#10
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidProsecutionRelatedPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های دوربین‌های ترافیکی که حاوی" +
            " فیلم تخلفات رانندگی به همراه " +
            "شماره پلاک اتومبیل متخلف است" +
            " و فاقد مشخصات راننده‌ای که پشت فرمان بوده است، می‌باشد." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidCareerRelatedPrivacy01", //#11
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidCareerRelatedPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            " دسترسی به داده‌های یک اپلیکیشن مشاوره شغلی و تحصیلی" +
            " که حاوی اطلاعاتی است مانند ادعاهای غیر واقعی افراد" +
            " در روزمه آن‌ها و نقاط ضعف‌شان در شغلی" +
            " یا رشته‌ای که برای آن درخواست داده‌اند، " +
            "به همراه مشخصات فردی نام، شماره تلفن و ایمیل هر یک از افراد." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidCareerRelatedPrivacy02", //#12
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidCareerRelatedPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های یک اپلیکیشن چت" +
            " که حاوی متن گفتگوی خصوصی میان کارمندان" +
            " و دانشجویان درباره مسایل کاری یا تحصیلی است" +
            " به همراه مشخصات فردی نام، شماره تلفن و ایمیل هر یک از افراد." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidFreedomRelatedPrivacy01", //#13
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidFreedomRelatedPrivacy01",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            " دسترسی به داده‌های لیست جستجوهای افراد" +
            " در گوگل به همراه مشخصات فردی" +
            " نام، شماره تلفن و ایمیل هر یک از افراد." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          },
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
        },
      ],
    },
    {
      name: "AGMPBidFreedomRelatedPrivacy02", //#14
      elements: [
        {
          // type: "nouislider",
          type: "text",
          name: "AGMPBidFreedomRelatedPrivacy02",
          title:
            "<nazlifont>" +
            this.firstCommonLineforQuestions +
            "دسترسی به داده‌های یک اپلیکیشن مشاوره ازدواج" +
            " که حاوی اطلاعات افراد است درباره رابطه‌های قبلی‌شان" +
            " و مشکلات شخصیتی آن‌ها که سبب شده مورد طرد قرار بگیرند،" +
            " به همراه مشخصات فردی، نام، شماره تلفن و ایمیل هر یک از افراد." +
            "</nazlifont>",
          description: {
            default: "",
            fa: "",
          }, 
          validators: [
            {
              type: "numeric",
              minValue: this.minValuation,
              maxValue: this.maxValuation,
            },
          ],
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
              "در این بخش داده‌های جمع آوری شده در فرایندها و اپلیکیشن‌های مختلفی به شما معرفی می‌شوند. " +
              "<br />" +
              "  فرض کنید می‌توانید به داده‌هایی که در ادامه می‌آیند دسترسی پیدا کنید." +
              " بین" +
              this.minMaxTextTitile +
              "چه ارزشی برای آن‌ها تعیین می کنید؟" +
              "<br />" +
              " به " +
              this.winnerCount +
              " نفر از شرکت کنندگانی که نمره ارزشگذاری‌های آن‌ها به" +
              "<green>" +
              "<underlinemarkdown>" +
              " میانگین" +
              "</underlinemarkdown>" +
              " نمره همه شرکت کنندگان " +
              "</green>" +
              " نزدیکتر باشد، جایزه ای تعلق می گیرد." +
              "</nazlifont>",
            choices: ["موافق هستم"],
            isRequired: true,
          },
        ],
      },
      ...this.auctionQuestionsShuffled,
    ],
    widthMode: "responsive",
    questionTitlePattern: "Title",
    requiredText: "",
    // questionsOnPageMode: "questionPerPage",
    showTimerPanel: "top",
    completeText: "بعدی",
  };

  render() {
    // console.log(this.json);

    var model = new Survey.Model(this.json);
    model.showQuestionNumbers = "off";
    // model.showPrevButton = false; // ^ Uncomment to disable back button
    // model.onUpdateQuestionCssClasses.add(function (survey, options) {
    //   var classes = options.cssClasses
    //   classes.mainRoot += " sv_qstn2";
    //   classes.root = "sq-root";
    //   classes.title += " sq-title"
    // });
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
        <p>
          پاسخ به سوالاتی که در ادامه می آید اجباری نیست اما به افزایش دقت
          آزمایش کمک می کند.{" "}
        </p>
        <p>لطفا برای شروع بخش بعدی آزمایش دکمه زیر را بزنید:</p>

        {/* <p>
          برای آگاهی از نتایج آزمایش پیشین و همینطور نمره خود در این پرسشنامه
          دکمه زیر را بزنید.
        </p> */}

        <Link to={`/nonpdscls/${this.getUserId()}`} className="ui button">
          شروع
        </Link>
      </div>
    ) : null;
    return (
      <div className="ui container">
        <p></p>
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
  ActionGameSecondPrice
);
