import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActiveUsersInMyRoom } from "../../actions";
import "./CurrentPlayersNumber.css";

class CurrentPlayersNumbers extends React.Component {
  componentDidMount() {
    this.props.fetchActiveUsersInMyRoom();
  }

  renderAdmin(userInMyRoom) {
    if (userInMyRoom.userId === this.props.currentUserId) {
      return <i className="large middle aligned icon user green" />;
    }
    return <i className="large middle aligned icon user blue" />;
  }

  renderUserNumbers() {
    return Object.values(this.props.activeUsersInMyRoom).length + 1;
    // return this.props.activeUsersInMyRoom.map((userInMyRoom) => {
    // return (
    // <div className="item" key={userInMyRoom.id}>
    //   {this.renderAdmin(userInMyRoom)}
    //   <div className="content">
    //     {userInMyRoom.id}
    //     <div className="description">{userInMyRoom.email}</div>
    //   </div>
    // </div>
    // );
    // });
  }

  // renderStartGame() {
  //   if (this.props.isSignedIn) {
  //     return (
  //       <div style={{ textAlign: "right" }}>
  //         <Link to="/shapesgameboard" className="ui button primary">
  //           Start Game
  //         </Link>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <div className="header">
        <div className="headerblock1">
          تعداد شرکت‌کنندگان: {this.renderUserNumbers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeUsersInMyRoom: Object.values(state.activeUsersInMyRoom),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchActiveUsersInMyRoom })(
  CurrentPlayersNumbers
);
