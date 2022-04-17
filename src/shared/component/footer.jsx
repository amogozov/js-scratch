// @flow

import React from "react";
import { APP_NAME } from "../config";

function Footer() {
  return (
    <div className="container mt-5">
      <hr />
      <footer>
        <p>© {APP_NAME} 2022</p>
      </footer>
    </div>
  );
}

export default Footer;
