const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //
  entry: { index: path.resolve(__dirname, "src", "client", "index.js") },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  
  // load an HTML template
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, 'public', 'favicon.png'),
    })
  ],
  // work with modern JS, React, CSS
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
};