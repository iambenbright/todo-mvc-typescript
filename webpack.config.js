const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.ts"),
  devtool: "inline-source-map",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
};
