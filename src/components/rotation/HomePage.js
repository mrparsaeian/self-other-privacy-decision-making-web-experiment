import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import FullScreenHandler from "../fullscreenhandler/FullScreenHandler";
// import { withRouter } from "react-router";
import "./HomePage.css";
class HomePage extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  

  render() {
    // const { history } = this.props;
    return (
      <div>
        <div className="ui placeholder segment">
          <FullScreenHandler />
          {/* <div class="ui hidden vertical divider">Or</div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { createStream })(HomePage);
// export default connect(mapStateToProps, { createStream })(withRouter(HomePage));
