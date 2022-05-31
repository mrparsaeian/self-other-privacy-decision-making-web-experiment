import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";
import { Link } from "react-router-dom";
import UserPasswordLoginForm from "./UserPasswordLoginForm";
import "./Authentication.css";
import history from "../../history";
import { bindActionCreators } from "redux";
class Authentication extends React.Component {
  constructor(props) {
    super(props);
    // this.handleFullScreen = this.props.handleFullScreen;
    this.handleFullScreenClickChild.bind(this);
  }
  handleFullScreenClickChild = () => {
    this.props.handleFullScreenInParent();
    // this.handleFullScreen();
    history.push(`/dandqol/${this.getUserId()}`);
  }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            // '797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com',
            // "193426547449-0b876ea8btalp2uj4mc88sovse2c931q.apps.googleusercontent.com", //last client
            // "193426547449-jp277e3qv06paakrr6f866v8v25uu7aa.apps.googleusercontent.com",
            // "193426547449-f3uqbfv6q068cpdfvv218uv8o76tog5b.apps.googleusercontent.com",
            "193426547449-ho2dfl5o46kps200n3mo2nhl5ag925t6.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  getUserId() {
    return this.auth.currentUser.get().getId();
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuth() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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
    } else {
      return (
        <div className="ui two stackable cards ">
          <div className="card">
            <UserPasswordLoginForm onSubmit={this.onSubmit} />
          </div>
          <div className="middle aligned card">
            <div className="ui form">
              <button
                onClick={this.onSignInClick}
                className="ui red google button servicebuttons "
              >
                <i className="google icon" />
                ورود با گوگل
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div className="ui placeholder segment">{this.renderAuth()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(Authentication);
