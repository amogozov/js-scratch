// @flow

// webpack needs to be explicitly required
import path from "path";

import { WDS_PORT } from "./src/shared/config";
import { isProd } from "./src/shared/util";

const webpack = require("webpack");

export default {
  mode: "development",
  entry: ["./src/client"],
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: isProd ? "/static/" : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader", exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: WDS_PORT,
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
