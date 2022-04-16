// @flow

import React from "react";
import { Route, Routes } from "react-router-dom";
import { APP_NAME } from "./config";
import Nav from "./component/nav";
import HomePage from "./component/page/home";
import HelloPage from "./component/page/hello";
import HelloAsyncPage from "./component/page/hello-async";
import NotFoundPage from "./component/page/not-found";
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
} from "./routes";

function App() {
  return (
    <div>
      <h1>{APP_NAME}</h1>
      <Nav />
      <Routes>
        <Route exact path={HOME_PAGE_ROUTE} element={<HomePage />} />
        <Route path={HELLO_PAGE_ROUTE} element={<HelloPage />} />
        <Route path={HELLO_ASYNC_PAGE_ROUTE} element={<HelloAsyncPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
