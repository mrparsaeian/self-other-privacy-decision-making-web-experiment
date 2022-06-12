import React from "react";
// import { useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchActiveUsersInMySession } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderStats from "../../statisticsreport/HeaderStats";
import AuctionGameForm from "./AuctionGameFreePriceForm";
import {
  fetchParticipant,
  editParticipant,
  fetchTasksSetupConfig,
} from "../../../actions";

import Modal from "../../Modal";
// import PlayersTable from "./PlayersTable";
// import CurrentPlayersNumber from "../statisticsreport/CurrentPlayersNumber";
// import UserCard from "./UserCard";
import history from "../../../history";
// import "./OntoTrusterGame.css";
// import "./GameBoard.css";
import "./AuctionGameFreePrice.css";

class AuctionGameClass extends React.Component {
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
        <p>
          برای دستیابی به داده‌های خصوصی فرد مورد علاقه خود  هزینه کنید؟
        </p>
        <p>
        </p>
        <p>
        </p>
        <p>
        </p>
        <p>
        </p>
        <AuctionGameForm onSubmit={this.onSubmit} />
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
    history.push(`/agsp/${this.getUserId()}`);
    return (
      <div style={{ textAlign: "right" }}>
        <p>
          شما۵۰ امتیاز از ۱۰۰ امتیاز خود را به شرکننده تصادفی دیگر داده اید.
        </p>
        <Link to={`/agmp/${this.getUserId()}`} className="ui button">
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
})(AuctionGameClass);
