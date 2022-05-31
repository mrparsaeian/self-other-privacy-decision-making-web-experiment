import React, { useEffect, useRef, useState, Fragment } from "react";
// import { Router, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import { Redirect, Switch, Route, withRouter } from "react-router";
import { Redirect, Switch, withRouter, Router, Route } from "react-router-dom";
import Fullscreen from "react-fullscreen-crossbrowser";
// import StreamCreate from "./rotation/StreamCreate";
// import StreamEdit from "./rotation/StreamEdit";
// import StreamDelete from "./rotation/StreamDelete";
// import WaitingRoom from "./rotation/WaitingRoom";
// import StreamShow from "./rotation/StreamShow";
import HomePage from "./rotation/HomePage";
// import ShapesGameBoard from "./shapesgame/BlobsGameBoard";
// import BlobsGameBoardMap from "./shapesgame/BlobsGameBoardMap";
// import SPINSurvey from "./survey/spinsurvey";
// import SurveyLanding from "./survey/surveylanding";
import Landing from "./initialization/landing";
// import SpinResults from "./survey/spinResults";
import Authentication from "./authentication/Authentication";
import DemographicAndQualityOfLife from "./survey/demographicandqualityoflife";
import DTriad from "./survey/dtriad";
import NonPIIDisClosure from "./survey/nonpiidisclosure";
import PIIDisClosure from "./survey/piidisclosure";
import AuctionGameFreePrice from "./games/AuctionGameFreePrice/AuctionGameFreePrice";
import AuctionGameMedianPrice from "./games/AuctionGameMedianPrice/AuctionGameMedianPrice";
import OntoTrustedGame from "./games/OntoTrusterGame/OntoTrusterGame";
import UponTrustedGame from "./games/UponTrusteeGame/UponTrusteeGame";
import history from "../history";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFullScreenInParent.bind(this);
    this.state = {
      isFullscreenEnabled: false,
    };
  }
  // const history = createBrowserHistory({ basename: 'process.env.PUBLIC_URL' });

  componentDidMount() {
    window.dispatchEvent(new CustomEvent("navigationhandler"));

    // const { history } = this.props;

    // history.listen((newLocation, action) => {
    //   if (action === "PUSH") {
    //     if (
    //       newLocation.pathname !== this.currentPathname ||
    //       newLocation.search !== this.currentSearch
    //     ) {
    //       // Save new location
    //       this.currentPathname = newLocation.pathname;
    //       this.currentSearch = newLocation.search;

    //       // Clone location object and push it to history
    //       history.push({
    //         pathname: newLocation.pathname,
    //         search: newLocation.search,
    //       });
    //     }
    //   } else {
    //     // Send user back if they try to navigate back
    //     history.go(1);
    //   }
    // });
  }
  handleFullScreenInParent() {
    this.setState({ isFullscreenEnabled: true });
  }
  render() {
    return (
      <Router history={history} ref={this.componentRef}>
        {/* <Router> */}
        {/* <BrowserRouter> */}
        {/* <Switch> */}
        {/* <button onClick={() => this.setState({isFullscreenEnabled: true})}>
          Go Fullscreen
        </button> */}
        <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={(isFullscreenEnabled) =>
            this.setState({ isFullscreenEnabled })
          }
        >
          <div className="ui container">
            {/* <div> */}
            <div>
              {/* <Route exact path="/" render={() => <Redirect to="/hp" />} /> */}
              {/* <Route path="/hp" component={HomePage} /> */}
              <Route
                exact
                path="/"
                render={(props) => (
                  <Authentication
                    handleFullScreenInParent={this.handleFullScreenInParent.bind(
                      this
                    )}
                    {...props}
                  ></Authentication>
                )}
              />
              {/* <Route exact path="/" component={Authentication handleFullScreen={this.handleFullScreen.bind(this)}} /> */}
              {/* <Route
                path="/landing/:id?/:samplingsourcetype?"
                exact
                component={Landing}
              /> */}
              <Route path="/dtr/:id" exact component={DTriad} />
              <Route path="/agfp/:id" exact component={AuctionGameFreePrice} />
              <Route
                path="/agmp/:id"
                exact
                component={AuctionGameMedianPrice}
              />
              <Route path="/uponteeg/:id" exact component={UponTrustedGame} />{" "}
              <Route path="/ontoterg/:id" exact component={OntoTrustedGame} />{" "}
              <Route
                path="/dandqol/:id"
                exact
                component={DemographicAndQualityOfLife}
              />
              <Route path="/nonpdscls/:id" exact component={NonPIIDisClosure} />
              <Route path="/pdscls/:id" exact component={PIIDisClosure} />
            </div>
          </div>
        </Fullscreen>
        {/* </Switch> */}
        {/* </BrowserRouter> */}
      </Router>
    );
  }
}
// export default withRouter(App);
export default App;
