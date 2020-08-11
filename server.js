const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");

const app = express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/",
  })
);

app.listen(3000, () => {
  console.log("httt://localhost:3000");
});
