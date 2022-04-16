// @flow

import React from "react";

import HelloAsyncButton from "../../container/hello-async-button";
import MessageAsync from "../../container/message-async";

function HelloAsyncPage() {
  return (
    <div>
      <MessageAsync />
      <HelloAsyncButton />
    </div>
  );
}

export default HelloAsyncPage;
