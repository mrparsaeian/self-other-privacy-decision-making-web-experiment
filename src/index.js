import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import "./fonts/Nazli/Nazli.woff2";
import "./index.css";
import reducers from "./reducers";
// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  // <React.StrictMode>
  // <FitToViewport width={650} height={550} minZoom={.2} maxZoom={0.7}>
  <Provider store={store} className="container">
    {/* <ResponsiveFontSize
      ratio={0.5}
      optionsObject={{
        setFontSize: true,
        globalVariableName: "--my-variable",
        lockFontSize: false,
      }}
    > */}
    <App className="" />
    {/* <Root /> */}
    {/* </ResponsiveFontSize> */}
  </Provider>,
  // </FitToViewport>,
  // </React.StrictMode>,
  document.querySelector("#root")
);
