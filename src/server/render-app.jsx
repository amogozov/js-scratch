// @flow

import React from "react";
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";

import initStore from "./init-store";
import App from "../shared/app";
import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from "../shared/config";
import { isProd } from "../shared/util";

const renderApp = (
  location: string,
  plainPartialState: ?Object,
  routerContext: ?Object = {}
) => {
  console.info(App)
  console.info("store");
  const store = initStore(plainPartialState);
  console.info("html");
  console.info(location);
  console.info(plainPartialState);
  const appHtml = renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  console.info("returning");

  return `<!doctype html>
    <html>
      <head>
        <title>FIX ME</title>
        <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
        </script>
        <script src="${
          isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`
        }/js/bundle.js"></script>
      </body>
    </html>`;
};

export default renderApp;
