const { default: merge } = require("webpack-merge");
const webpackBase = require('./webpack.base.js')

module.exports = merge(webpackBase, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: "false",
    }),
  ],
});
