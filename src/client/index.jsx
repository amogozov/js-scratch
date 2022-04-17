// @flow

/* eslint-disable */
import "@babel/polyfill";

import $ from "jquery";
import Tether from "tether";
import Immutable from "immutable";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import App from "../shared/app";
import helloReducer from "../shared/reducer/hello";
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR } from "../shared/config";
import { isProd } from "../shared/util";
import setUpSocket from "./socket";
/* eslint-enable */

window.jQuery = $;
window.Tether = Tether;
require("bootstrap");

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const preloadedState = window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);
const root = createRoot(rootEl);

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </Provider>
);

root.render(wrapApp(App, store));

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept("../shared/app", () => {
    // eslint-disable-next-line global-require
    const NextApp = require("../shared/app").default;
    root.render(wrapApp(NextApp, store));
  });
}

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR);
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide);

setUpSocket(store);
