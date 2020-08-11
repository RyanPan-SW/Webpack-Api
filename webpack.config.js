const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // 入口文件配置
  output: {
    // 输出文件配置
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  watch: true,
  devServer: {
    prot: 8080, // 启动端口
    open: true, // 自动打开页面
    hot: true, // 热更新
    contentBase: "/",
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/i,
        loader: "html-withimg-loader",
      },
      {
        test: /\.css$/,
        // webpack读取loader时 是从右到左的读取, 会将css文件先交给最右侧的loader来处理
        // loader的执行顺序是从右到左以管道的方式链式调用
        use: ["style-loader", "css-loader"],
      },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      {
        test: /\.(jpg|jpeg|png|bmp|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5 * 1024,
            outputPath: "images",
            name: "[name]-[hash:6].[ext]",
          },
        },
      },
      { test: /\.(woff|woff2|eot|svg|ttf)$/, use: "url-loader" },
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "assets"),
          to: "assets",
        },
      ],
    }),
    new webpack.BannerPlugin("大牛牛"),
  ],
  // devtool: 'cheap-module-eval-source-map'
};
