import React from "react";
// import { useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchActiveUsersInMySession } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderStats from "../../statisticsreport/HeaderStats";
import UponTrusteePointsOfferingForm from "./UponTrusteePointsOfferingForm";
import { fetchParticipant, editParticipant ,fetchTasksSetupConfig} from "../../../actions";

import Modal from "../../Modal";
// import PlayersTable from "../AuctionGame/PlayersTable";
// import CurrentPlayersNumber from "../statisticsreport/CurrentPlayersNumber";
// import UserCard from "./UserCard";
import history from "../../../history";
import "./UponTrusteeGame.css";

class UponTrusteeGameClass extends React.Component {
  componentDidMount() {
    this.props.fetchTasksSetupConfig("informationauctiongameofl");
    //disables hthe back button
    window.dispatchEvent(new CustomEvent("navigationhandler"));
  }
  // renderAuctionPricePolicyDescription() {
  //   if (this.props.isSignedIn) {
  //     return (
  //       <div style={{ textAlign: "right" }}>
  //         <p>
  //           با توجه به داده‌هایی که در این فایل اکسل ذخیره شده‌اند قیمت مورد نظر
  //           خود را وارد نمایید:
  //         </p>
  //       </div>
  //     );
  //   }
  // }
  getUserId() {
    const { id } = this.props.match.params;
    return id;
  }
  onSubmit = (formValuesForUponTrusteePointsOfferingForm) => {
    // formValues = {"ontotrusergamedata": {...formValues}}
    // this.props.editParticipant(this.getUserId(),formValues);
    this.onCompleteComponent(formValuesForUponTrusteePointsOfferingForm)
  };

  renderUponTrusteeDescription() {
    // if (this.props.isSignedIn) {
    return (
      <div style={{ textAlign: "right" }}>
        <p>
          از میان همه شرکت کنندگان قبلی که در این آزمایش شرکت کرده‌اند یک نفر به صورت تصادف
          همبازی شما شده است.
          </p>
          <p>
           در هنگام انجام آزمایش ۱۰۰ امتیاز به او واگذار شده‌بود.
           </p>
          <p>
          او تصمیم گرفت که ۵۰ امتیاز آنرا واگذار کند.
        </p>
        <p>این ۵۰ امتیاز هم‌اکنون ۳ برابر می‌شود و به حساب شما اضافه می‌شود.</p>
        <p>شما ۱۵۰ امتیاز دارید.</p>
        <p>چه مقدار از ۱۵۰ امتیاز را به همان شرکت کننده برمی‌گردانید؟</p>
        <p>
      {/* Participant A sent you {{ group.sent_amount }}.
      They were tripled so you received {{ tripled_amount }}.
      You chose to return {{ group.sent_back_amount }}. */}
      شرکت‌کننده 
      C
      مقدار 
      `$endoment`
      برای شما فرستاد. این مقدار هم اکنون ۳ برابر شده  بنابراین شما 
      `$endoment`
      دریافت کردید.
      شما تصمیم گرفتید که مقدار 
      `$endoment`
      به او برگردانید.
  </p>
  <p>
      {/* You received {{ tripled_amount }},
      chose to return {{ group.sent_back_amount }}
      thus you now have:
      ({{ tripled_amount }})-({{ group.sent_back_amount }})=<b>{{ player.payoff }}</b> */}
      شما مقدار
      `$endoment`
      دریافت کردید بنابر این اکنون 
      `$endoment`
      دارید.
  </p>
        <UponTrusteePointsOfferingForm onSubmit={this.onSubmit} />
      </div>
    );
    // }
  }
  onCompleteComponent(uponTrusteeGameData, options) {
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
    uponTrusteeGameData = {
      uponTrusteeGameData: { ...uponTrusteeGameData },
      submittime: dateTime,
    };
    this.props.editParticipant(this.props.match.params.id, {
      uponTrusteeGameData: { ...uponTrusteeGameData },
    });
    history.push(`/agfp/${this.getUserId()}`)
    return (
      <div style={{ textAlign: "right" }}>
        <p>
          شما۱۱۰ امتیاز از ۲۲۰ امتیاز دریافتی خود را به شرکننده تصادفی دیگری داده اید.
        </p>
        {/* <Link to={`/agfp/${this.getUserId()}`} className="ui button">
          مرحله بعدی
        </Link> */}
      </div>
    );
  }
  render() {
    this.gameData = { endowment: 100, giveout: 50 };
    return (
      <div>
        {/* <div className="ui celled list">{this.renderPlayersList()}</div> */}
        {this.renderUponTrusteeDescription()}
        {/* {this.onCompleteComponent(this.gameData)} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeUsersInMyRoom: Object.values(state.activeUsersInMyRoom),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    currentGameRoundWinner: state.currentGameRoundWinner,
    tasksSetupConfig: state.tasksSetupConfig,
  };
};

export default connect(mapStateToProps, {
  // fetchActiveUsersInMyRoom,
  // fetchCurrentGameRoundWinner,
  fetchTasksSetupConfig,
  fetchParticipant,
  editParticipant,
})(UponTrusteeGameClass);

