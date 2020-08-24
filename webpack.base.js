const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: "./src/index.js", // 入口文件配置
  output: {
    // 输出文件配置
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/,
        // webpack读取loader时 是从右到左的读取, 会将css文件先交给最右侧的loader来处理
        // loader的执行顺序是从右到左以管道的方式链式调用
        // css-loader: 解析css文件
        // style-loader: 将解析出来的结果 放到html中, 使其生效
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      { 
        test: /\.less$/, 
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"] 
      },
      {
        test: /\.s(a|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader",'postcss-loader', "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|bmp|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5 * 1024,
            outputPath: "images",
            name: "[name]-[hash:4].[ext]",
          },
        },
      },
      { test: /\.(woff|woff2|eot|svg|ttf)$/, use: "url-loader" },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ['@babel/env'],
          //   plugins: [
          //     '@babel/plugin-proposal-class-properties',
          //     '@babel/plugin-transform-runtime'
          //   ]
          // }
        },
        exclude: /node_modules/,
      },
      // {
      //   test: require.resolve("jquery"), // 引入第三方库的方式一
      //   use: { loader: "expose-loader", options: "$" },
      // },
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
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.BannerPlugin("大牛牛"),
    new webpack.ProvidePlugin({  // 引入第三方库的方式二
      $: "jquery",  // 定义的两个变量
      jQuery: "jquery",
    }),
  ],
  // devtool: 'cheap-module-eval-source-map'
};
