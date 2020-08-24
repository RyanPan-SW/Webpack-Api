const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base.js");
const webpack = require("webpack");

module.exports = merge(webpackBase, {
  mode: "development",
  watch: true,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    // contentBase: "/",
    proxy: {
      // 代理-解决跨域的问题
      "^/api": "localhost:9999", // 方法一
      // "^/api": {               // 方法二
      //   target: "localhost:9999",
      //   pathRewrite: {
      //     "^/api": "",
      //   },
      // },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: "true",
    }),
  ],
  devtool: "cheap-module-eval-source-map",
});
