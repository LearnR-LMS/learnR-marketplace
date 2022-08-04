const path = require("path"); // lấy đường dẫn tuyệt đối của thư mục
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  devServer: {
    allowedHosts: "all",
    historyApiFallback: true,
    watchFiles: ['*.css']
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
        test: /\.css$/,
      },
      {
        test: /\.(jsx|js)?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  resolve: {
    fallback: {
      buffer: false,
      crypto: require.resolve("crypto-browserify"),
      events: false,
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      string_decoder: false,
    },
  },
};
module.exports = config;
