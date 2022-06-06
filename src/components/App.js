import React, { useEffect, useRef, useState, Fragment } from "react";
// import { Router, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import { Redirect, Switch, Route, withRouter } from "react-router";
import { Redirect, Switch, withRouter, Router, Route } from "react-router-dom";
import Fullscreen from "react-fullscreen-crossbrowser";
import { ModalsProvider, useModals, ContextModalProps } from "@mantine/modals";
import { Text, Button, TextInput, MantineProvider } from "@mantine/core";
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
    this.handleFullScreenChangeEvent.bind(this);
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
  handleFullScreenInParent = () => {
    this.setState({ isFullscreenEnabled: true });
  };
  handleFullScreenChangeEvent = (isFullscreenEnabled) => {
    this.setState({ isFullscreenEnabled });
    if (!isFullscreenEnabled) {
      console.log("Exited from full Screen");
      this.openContextTestingModal();
    }
  };
  modals = useModals();

  openMultiStepModalExitFullScreen = () =>
    this.modals.openConfirmModal({
      title: "Please confirm your action",
      closeOnConfirm: false,
      labels: { confirm: "Next modal", cancel: "Close modal" },
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      onConfirm: () =>
        this.modals.openConfirmModal({
          title: "This is modal at second layer",
          labels: { confirm: "Close modal", cancel: "Back" },
          closeOnConfirm: false,
          children: (
            <Text size="sm">
              When this modal is closed modals state will revert to first modal
            </Text>
          ),
          onConfirm: () => this.modals.closeAll(),
        }),
    });
  // modals = useModals();
  openContextTestingModal = () =>
    this.modals.openContextModal("testing", {
      title: "Test modal from context",
      innerProps: {
        modalBody:
          "This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook",
      },
    });
  render() {
    return (
      <MantineProvider>
        <ModalsProvider
          modals={{
            multiStepModalExitFullScreen: this.openMultiStepModalExitFullScreen,
            testing: this.TestModal /* ...other modals */,
          }}
        >
          <Router history={history} ref={this.componentRef}>
            {/* <Router> */}
            {/* <BrowserRouter> */}
            {/* <Switch> */}
            {/* <button onClick={() => this.setState({isFullscreenEnabled: true})}>
          Go Fullscreen
        </button> */}
            <Fullscreen
              enabled={this.state.isFullscreenEnabled}
              onChange={this.handleFullScreenChangeEvent}
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
                  <Route
                    path="/agfp/:id"
                    exact
                    component={AuctionGameFreePrice}
                  />
                  <Route
                    path="/agmp/:id"
                    exact
                    component={AuctionGameMedianPrice}
                  />
                  <Route
                    path="/uponteeg/:id"
                    exact
                    component={UponTrustedGame}
                  />{" "}
                  <Route
                    path="/ontoterg/:id"
                    exact
                    component={OntoTrustedGame}
                  />{" "}
                  <Route
                    path="/dandqol/:id"
                    exact
                    component={DemographicAndQualityOfLife}
                  />
                  <Route
                    path="/nonpdscls/:id"
                    exact
                    component={NonPIIDisClosure}
                  />
                  <Route path="/pdscls/:id" exact component={PIIDisClosure} />
                </div>
              </div>
            </Fullscreen>
            {/* </Switch> */}
            {/* </BrowserRouter> */}
          </Router>
        </ModalsProvider>
      </MantineProvider>
    );
  }
}
// export default withRouter(App);
export default App;
