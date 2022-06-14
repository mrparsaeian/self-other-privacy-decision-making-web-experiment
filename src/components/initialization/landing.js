import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
// import Authentication from "../authentication/Authentication";
import "./landing.css";
import { Link } from "react-router-dom";
import { fetchParticipant } from "../../actions";
import _ from "lodash";

class SurveyLanding extends React.Component {
  componentDidMount() {
    this.props.fetchParticipant(this.props.match.params.id);
    this.props.fetchParticipant(this.props.match.params.samplingsourcetype);
  }
  getUserId() {
    const { id } = this.props.match.params;
    return id;
  }
  render() {
    return (
      <div>
        <div className="ui placeholder segment">
          <div>
            <span>
              <img
                src={"http://aris.ut.ac.ir/sp/res/img/ut.png"}
                align="center"
                alt="دانشگاه تهران"
                width="100"
                height="100"
              />
            </span>
          </div>

          <p>
            {/* شما با ایمیل {this.getUserId()} که شناسه شما می‌باشد، وارد شده‌اید. */}
            - شرکت در این پژوهش کاملا داوطلبانه است و اجباری برای شرکت در این
            پژوهش نیست.
          </p>
          <p>
            - حتی پس از موافقت با شرکت در پژوهش، هر زمان که بخواهید، می توانید
            از سیستم خارج شوید.
          </p>
          <p>- این پژوهش هیچ گونه آسیبی در پی نخواهد داشت.</p>
          <p>
            - کمیته اخلاق در این پژوهش با هدف نظارت بر حقوق شما می تواند به
            اطلاعاتتان، دسترسی داشته باشد.
          </p>
          <p>
            - در صورت بروز مشکل می توانید با مسئول پژوهش، آقای محمد رسول
            پارسائیان با شماره تلفن ۰۹۳۶۵۱۵۶۸۳۰ تماس حاصل نمایید.
          </p>
          <p>
            با تشکر از شکر شما در این آزمایش، لطفا برای شروع آزمایش دکمه زیر را
            فشار دهید.
          </p>
          <p>
            {/* اینجانب موارد فوق الذکر را خواندم و براساس آن رضایت آگاهانه خود را
            برای شرکت در این پژوهش اعلام می کنم. */}
          </p>
          <Link to={`/demographic/${this.getUserId()}`} className="ui button">
            پذیرش و ادامه
          </Link>
          <p>
            {/* در حال بروز رسانی سرور هستیم. با عرض پوزش، لطفا پس از دریافت ایمیل دیگری که متعاقبا ارسال خواهد شد، مجددا وارد شوید. */}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    participant: state.participant,
    samplingsourcetype: state.samplingsourcetype,
  };
};

export default connect(mapStateToProps, { fetchParticipant })(SurveyLanding);
