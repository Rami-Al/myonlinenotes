const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /^node_modules$/,
        use: "babel-loader"
      },
      {
        test: /\.(sc|c)ss$/,
        exclude: /^node_modules$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/i,
        exclude: /^node_modules$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 70
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: 10
              },
              gifsicle: {
                optimizationLevel: 3
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/html-template.html" })]
};
