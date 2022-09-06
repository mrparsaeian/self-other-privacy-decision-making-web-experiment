// "bootstrap": "^5.1.3",
import React from "react";
import { connect } from "react-redux";
import { Router, Route, Routes } from "react-router-dom";
import Fullscreen from "react-fullscreen-crossbrowser";
import Landing from "./survey/Landing";
import InterventionQuestionnaire from "./survey/InterventionQuestionnaire";
import DTriad from "./survey/dtriad";
import Assessment from "./survey/Assessment";

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

import SelfPIIDisclosure from "./survey/SelfPIIDisclosure";
import OtherPIIDisclosure from "./survey/OtherPIIDisclosure";
import GlobalConsent from "./survey/GlobalConsent";
import Final from "./survey/Final";
import WillingnessToPay from "./survey/WillingnessToPay";

import TPBQuestionnaire from "./survey/TPBQuestionnaire";
import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import history from "../history";
// import Modals from "../modals/modals"
import {

  // editParticipant,
  // createUser,
} from "../actions";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFullScreenInParent.bind(this);
    this.handleFullScreenChangeEvent.bind(this);
    this.state = {
      isFullscreenEnabled: false,
    };
  }

  componentDidMount() {
    //Disables back button
    window.dispatchEvent(new CustomEvent("navigationhandler"));
  }
  handleFullScreenInParent = () => {
    this.setState({ isFullscreenEnabled: true });
  };
  handleFullScreenChangeEvent = (isFullscreenEnabled) => {
    this.setState({ isFullscreenEnabled });
    if (!isFullscreenEnabled) {
      console.log("Exited from full Screen");
      // this.openContextTestingModal();
    }
  };
  SVOUrlGen = (urlAfter) => (user) => "https://ponya.ir/survey?participantID=" + user + "&nxtPg=https://www.ponya.ir" + urlAfter
  URLForPageInit = {
    Landing: "/landing/",
    GlobalConsent: "/g/",
    SelfPIIDisclosure: "/s/",
    OtherPIIDisclosure: "/o/",
    InterventionQuestionnaire: "/i/",
    Assessment: "/a/",
    TPBQuestionnaire: "/t/",
    WillingnessToPay: "/w/",
    DTriad: "/d/",
    // SVO: this.SVOUrlGen(),
    Final: "/f/",
    Exit: "/e/",
  };
  URLForPage = { ...this.URLForPageInit, SVO: this.SVOUrlGen(this.URLForPageInit.Final) }
  RandomizeGroups = (a) =>
    Math.random() > 0.5
      ? {
        "1stPage": a[0],
        "2ndPage": a[1],
        pageAfter1stPage: a[1],
        pageAfter2ndPage: this.URLForPage.Assessment,
      }
      : {
        "1stPage": a[1],
        "2ndPage": a[0],
        pageAfter1stPage: a[0],
        pageAfter2ndPage: this.URLForPage.Assessment,
      };

  selfOtherPIIDisclosureOrder = this.RandomizeGroups([
    "SelfPIIDisclosure",
    "OtherPIIDisclosure",
  ]);
  // this.URLForPage[this.selfOtherPIIDisclosureOrder["1stPage"]]
  thePageAfterSVO = `https://www.ponya.ir/${this.URLForPage.SelfPIIDisclosure}`;
  passToSecondPage = {
    urlForSVOPart1: "https://www.ponya.ir/participantID=",
    urlForSVOPart2:
      `https://ponya.ir/participantID=${this.userID
      }&nxtPg=https://www.ponya.ir${this.URLForPage[this.selfOtherPIIDisclosureOrder["1stPage"]]
      }` +
      "&nxtPg=https://www.ponya.ir/" +
      this.URLForPage[this.selfOtherPIIDisclosureOrder["1stPage"]],
  };
  pageAfterDTriadURLofSVO = `https://ponya.ir/participantID=${this.userID
    }&nxtPg=https://www.ponya.ir${this.URLForPage[this.selfOtherPIIDisclosureOrder["1stPage"]]
    }`;
  selfOtherPIIDisclosureSVOOrder = {
    urlBeforeUserID: "https://ponya.ir/survey?participantID=",
    urlAfterUserIDthis:
      "&nxtPg=https://www.ponya.ir" + this.URLForPage.Assessment,
  };

  nextPageFor = {
    Landing: this.URLForPage.GlobalConsent,
    GlobalConsent: this.URLForPage.SelfPIIDisclosure,
    SelfPIIDisclosure: this.URLForPage.OtherPIIDisclosure,
    OtherPIIDisclosure: this.URLForPage.InterventionQuestionnaire,
    InterventionQuestionnaire: this.URLForPage.Assessment,
    Assessment: this.URLForPage.TPBQuestionnaire,
    TPBQuestionnaire: this.URLForPage.WillingnessToPay,
    WillingnessToPay: this.URLForPage.DTriad,
    DTriad: this.URLForPage.SVO,
    SVO: this.URLForPage.Final,
    Final: this.URLForPage.Exit,
  };
  // [this.selfOtherPIIDisclosureOrder["1stPage"]]:
  //   this.URLForPage[this.selfOtherPIIDisclosureOrder["2ndPage"]],
  // [this.selfOtherPIIDisclosureOrder["2ndPage"]]: this.URLForPage.Final,
  render() {
    // console.log(
    //   this.URLForPage.SelfPIIDisclosure,
    //   this.URLForPage.OtherPIIDisclosure,
    //   this.nextPageFor.SelfPIIDisclosure,
    //   this.nextPageFor.OtherPIIDisclosure,
    //   this.URLForPage[this.selfOtherPIIDisclosureOrder["1stPage"]],
    //   this.URLForPage[this.selfOtherPIIDisclosureOrder["2ndPage"]]
    // );
    return (
      <Router history={history} ref={this.componentRef}>
        <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={this.handleFullScreenChangeEvent}
        >
          <Route
            exact
            path="/landing/"
            render={(props) => (
              <Landing
                handleFullScreenInParent={this.handleFullScreenInParent.bind(
                  this
                )}
                nextPage={this.nextPageFor.Landing}
                {...props}
              ></Landing>
            )}
          />
          <Route path={this.URLForPage.TPBQuestionnaire + ":id"} exact>
            <TPBQuestionnaire nextPage={this.nextPageFor.TPBQuestionnaire} />
          </Route>
          <Route path={this.URLForPage.GlobalConsent + ":id"} exact>
            <GlobalConsent nextPage={this.nextPageFor.GlobalConsent} />
          </Route>
          <Route path={this.URLForPage.InterventionQuestionnaire + ":id"} exact>
            <InterventionQuestionnaire
              nextPage={this.nextPageFor["InterventionQuestionnaire"]}
            />
          </Route>
          <Route path={this.URLForPage.Assessment + ":id"} exact>
            <Assessment
              nextPage={this.nextPageFor["Assessment"]}
            />
          </Route>
          <Route path={this.URLForPage.OtherPIIDisclosure + ":id"} exact>
            <OtherPIIDisclosure
              nextPage={this.nextPageFor["OtherPIIDisclosure"]}
            />
          </Route>
          <Route path={this.URLForPage.SelfPIIDisclosure + ":id"} exact>
            <SelfPIIDisclosure
              nextPage={this.nextPageFor["SelfPIIDisclosure"]}
            />
          </Route>
          <Route path={this.URLForPage.DTriad + ":id"} exact>
            <DTriad nextPage={this.nextPageFor["DTriad"]} />
          </Route>
          <Route path={this.URLForPage.WillingnessToPay + ":id"} exact>
            <WillingnessToPay nextPage={this.nextPageFor["WillingnessToPay"]} />
          </Route>
          <Route path={this.URLForPage.Final + ":id"} exact>
            <Final nextPage={this.nextPageFor["Final"]} />
          </Route>
        </Fullscreen>
      </Router>
      // {/* </ons-page> */}
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
};
export default connect(mapStateToProps, {

})(App);
// export default withRouter(FullScreen);
// export default App;
