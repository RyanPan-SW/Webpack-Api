const path = require("path");

module.exports = {
  entry: "./src/index.js", // 入口文件配置
  output: {  // 输出文件配置
    path: path.join(__dirname, "dist/"),
    filename: "custombundle.js",
  },
  mode: "production",
};
