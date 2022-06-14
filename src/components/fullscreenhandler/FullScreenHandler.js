import React from "react";
import { connect } from "react-redux";
// import { signIn, signOut } from "../../actions";
// import { Link } from "react-router-dom";
// import UserPasswordLoginForm from "./UserPasswordLoginForm";
// import "./Authentication.css";
import history from "../../history";
// import { bindActionCreators } from "redux";
class FullScreenHandler extends React.Component {
  constructor(props) {
    super(props);
    // this.handleFullScreen = this.props.handleFullScreen;
    this.handleFullScreenClickChild.bind(this);
  }
  handleFullScreenClickChild = () => {
    this.props.handleFullScreenInParent();
    // this.handleFullScreen();
    history.push(`/dandqol/${this.getUserId()}`);
  };
  // componentDidMount() {

  // }
  getUserId() {
    const { id } = this.props.match.params;
    return id;
  }
  renderFullScreen() {
    return (
      <div style={{ textAlign: "middle" }}>
        {/* <Link to={`/dandqol/${this.getUserId()}`} className="ui button">
            شروع
          </Link> */}
        <button
          onClick={this.handleFullScreenClickChild}
          className="ui blue button"
        >
          <i className="user icon" />
          شروع
        </button>
      </div>
    );
  }
  render() {
    return (
      <div className="ui placeholder segment">{this.renderFullScreen()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isSignedIn: state.auth.isSignedIn,
    // currentUserId: state.auth.userId,
    currentUserId: state.userId,
  };
};

export default connect(mapStateToProps, {})(FullScreenHandler);
