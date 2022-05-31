import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { FitToViewport } from "react-fit-to-viewport";
import App from "./components/App";
import reducers from "./reducers";
import { ResponsiveFontSize } from "react-responsive-font-size";
import 'bootstrap/dist/css/bootstrap.css';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  // <React.StrictMode>
  // <FitToViewport width={650} height={650} minZoom={.5} maxZoom={0.7}>
  <Provider store={store}>
    {/* <ResponsiveFontSize
      ratio={0.5}
      optionsObject={{
        setFontSize: true,
        globalVariableName: "--my-variable",
        lockFontSize: false,
      }}
    > */}
      <App />
    {/* </ResponsiveFontSize> */}
  </Provider>,
  // </FitToViewport>,
  // </React.StrictMode>,
  document.querySelector("#root")
);
