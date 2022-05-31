import React from "react";
import { connect } from "react-redux";
import {
  updateTimerActionCreator,
  timedoutTimerGlobalFunctionActionCreator,
} from "../../actions";
import "./Timer.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    if (this.timer === 0 && this.props.currentTimerTime > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
componentWillUnmount(){
  this.props.updateTimerActionCreator(30);
  clearInterval(this.timer);


}
  countDown() {
    this.props.updateTimerActionCreator(this.props.currentTimerTime - 1);
    if (this.props.currentTimerTime === 1) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="header">
        <div className="headerblock1">
          Time left: {this.props.currentTimerTime}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentTimerTime: state.currentTimer.currentTimerTime,
    timeOutGlobalFuction: state.currentTimer.timeOutGlobalFuction,
  };
};
export default connect(mapStateToProps, { updateTimerActionCreator })(Timer);
