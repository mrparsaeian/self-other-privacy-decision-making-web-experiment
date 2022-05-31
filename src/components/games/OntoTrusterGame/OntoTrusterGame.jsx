import React from "react";
// import { useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchActiveUsersInMySession } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderStats from "../../statisticsreport/HeaderStats";
import OntoTrusterPointsOfferingForm from "./OntoTrusterPointsOfferingForm";
import {
  fetchParticipant,
  editParticipant,
  fetchTasksSetupConfig,
} from "../../../actions";

import Modal from "../../Modal";
// import PlayersTable from "../AuctionGame/PlayersTable";
// import CurrentPlayersNumber from "../statisticsreport/CurrentPlayersNumber";
// import UserCard from "./UserCard";
import history from "../../../history";
import "./OntoTrusterGame.css";
// import "./GameBoard.css";
// import "./AuctionGame.css";

class OntoTrusterGameClass extends React.Component {
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
  onSubmit = (formValues) => {
    // formValues = {"ontotrusergamedata": {...formValues}}
    // this.props.editParticipant(this.getUserId(),formValues);
    this.onCompleteComponent(formValues);
  };
  renderTrusterDescription() {
    // if (this.props.isSignedIn) {
    return (
      <div style={{ textAlign: "right" }}>
        <p>هم‌اکنون ۱۰۰ امتیاز به حساب شما واریز می‌شود.</p>
        <p>
          از این ۱۰۰ امتیاز می توانید مقداری را به دلخواه به یکی دیگر از
          شرکت‌کنندگان در این آزمایش، که به طور تصادفی از بین همه شرکت‌کنندگان
          انتخاب خواهد شد، پرداخت کنید.{" "}
        </p>
        <p>
          مقداری که انتخاب می‌کنید، در عدد ۳ ضرب شده و به حساب آن شرکت‌کننده
          .واریز می شود
        </p>
        <p>
          سپس شرکت کننده‌ای که دریافت کننده این امتیاز است، در هنگام انجام
          آزمایش، می تواند به انتخاب خود، مقدار دلخواهی از کل امتیاز دریافتی را به
          شما بازگرداند. این مقدار در حساب شما منظور می‌شود و مبلغ ریالی معادل آن به شما پرداخت
          خواهد شد.
        </p>
        <p>
           از ۱۰۰ امتیازی که در اختیار دارید، چند امتیاز را به حساب یک شرکت‌کننده دیگر که تصادفی انتخاب
          می‌شود، واریز می‌کنید؟
        </p>
        <OntoTrusterPointsOfferingForm onSubmit={this.onSubmit} />
      </div>
    );
    // }
  }
  onCompleteComponent(ontoTruserGameData, options) {
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
    ontoTruserGameData = {
      ontotrusergamedata: { ...ontoTruserGameData },
      submittime: dateTime,
    };
    this.props.editParticipant(this.props.match.params.id, {
      ontotrusergamedata: { ...ontoTruserGameData },
    });
    history.push(`/uponteeg/${this.getUserId()}`);
    return (
      <div style={{ textAlign: "right" }}>
        <p>
          شما۵۰ امتیاز از ۱۰۰ امتیاز خود را به شرکننده تصادفی دیگر داده اید.
        </p>
        <Link to={`/uponteeg/${this.getUserId()}`} className="ui button">
          مرحله بعدی
        </Link>
      </div>
    );
  }
  render() {
    this.gameData = { endowment: 100, giveout: 50 };
    return (
      // <div className="blobscontainer boxofgame">
      <div>
        {/* <div className="ui celled list">{this.renderPlayersList()}</div> */}
        {this.renderTrusterDescription()}
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
})(OntoTrusterGameClass);
