const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ETP = require("extract-text-webpack-plugin");
var imageWebpackLoader = require("image-webpack-loader");

module.exports = {
  entry: {
    app: './index.js'
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
        test: /\.(css|sass|scss)$/,
        loader: ETP.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
      },
      {
        test: /\.(ttf|eot|woff|svg|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: `src/fonts/[name].[ext]`,
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {

              disable: true
            },
          },
        ],
      }
    ]
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Cards",
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: "./index.html"
    }),
    new ETP("main.css")
  ]
}
