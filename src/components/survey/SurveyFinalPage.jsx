import "../style.css";
import { Link } from "react-router-dom";
import { Component } from "react";
// import ReactDOM from "react-dom";

class SurveyFinalPage extends Component {
  constructor(props) {
    super(props);
  }
  nextPageFunction = () => {
    // console.log(nextPage.substring(0, 3));
    if (typeof this.props.nextPage === "function")
      return (
        <a
          style={{
            font: "1.5rem NazliRegular",
            align: "center",
            "backgroundColor": "#179d82", /* Green */
            border: "none",
            color: "white",
            // padding: "auto auto",
            /* textAlign: center, */
            "textDecoration": "none",
            /* display: inline-block, */
            "fontSize": "2rem",
            "borderRadius": "0.2rem",
            /* display: block, */
            margin: "0px auto",
            "marginRight": "auto",
            /* width: 40%, */
            /* width: 25%, */
            /* padding: 1em 0, */
            /* min-height: 2em, */
            /* color: white, */
            /* backgroundColor: #1ab394, */
            /* float: left, */
            "marginBottom": "auto",
            width: "8rem",
            height: "3.5rem",
            "textAlign": "center",
            cursor: "pointer"
          }}
          href={
            this.props.nextPage(this.props.userIDThisPage)
          }
        >
          شروع
        </a>
      );
    else
      return (
        <Link
          to={this.props.nextPage}
          style={{
            font: "1.5rem NazliRegular",
            align: "center",
            "backgroundColor": "#179d82", /* Green */
            border: "none",
            color: "white",
            // padding: "auto auto",
            /* textAlign: center, */
            "textDecoration": "none",
            /* display: inline-block, */
            "fontSize": "2rem",
            "borderRadius": "0.2rem",
            /* display: block, */
            margin: "0px auto",
            "marginRight": "auto",
            /* width: 40%, */
            /* width: 25%, */
            /* padding: 1em 0, */
            /* min-height: 2em, */
            /* color: white, */
            /* backgroundColor: #1ab394, */
            /* float: left, */
            "marginBottom": "auto",
            width: "8rem",
            height: "3.5rem",
            "textAlign": "center",
            cursor: "pointer"
          }}
        // className="final_start_button"
        >
          <div className="font-face-nazli">شروع</div>
        </Link>
      );
  };
  render() {
    return (
      <div className="card ">
        <p className="font-face-nazli">
          لطفا برای شروع بخش بعدی آزمایش دکمه زیر را بزنید:
        </p>
        {this.nextPageFunction(this.props.nextPage)}
      </div>
    );
  }
}
export default SurveyFinalPage;
