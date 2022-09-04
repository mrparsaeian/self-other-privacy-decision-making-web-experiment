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
    if (this.props.nextPage.substring(0, 3) === "htt")
      return (
        <a
          className="final_start_button"
          href={
            this.props.nextPage +
            this.props.userIDThisPage +
            this.props.urlAfterUserIDthis
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
            "background-color": "#179d82", /* Green */
            border: "none",
            color: "white",
            // padding: "auto auto",
            /* text-align: center, */
            "text-decoration": "none",
            /* display: inline-block, */
            "font-size": "2rem",
            "border-radius": "0.2rem",
            /* display: block, */
            "margin-left": "auto",
            "margin-right": "auto",
            /* width: 40%, */
            /* width: 25%, */
            /* padding: 1em 0, */
            /* min-height: 2em, */
            /* color: white, */
            /* background-color: #1ab394, */
            /* float: left, */
            "margin-bottom": "auto",
            width: "8rem",
            height: "3.5rem",
            "text-align": "center",
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
