// webpack.config.js (ESM)
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import dotenv from "dotenv";

dotenv.config();

export default (env = {}) => ({
  mode: env.production ? "production" : "development",
  entry: "./src/main.tsx",
  output: {
    path: path.resolve("dist"),
    filename: env.production ? "static/[name].[contenthash].js" : "bundle.js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: { fs: false, path: false },
  },
  devtool: env.production ? "source-map" : "eval-source-map",

  devServer: {
    static: { directory: path.resolve("public") },
    historyApiFallback: true,
    hot: true,
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: "all",
    proxy: [
      {
        context: ["/api"],
        target: "https://localhost:7020",
        secure: false,
        changeOrigin: true,
      },
      {
        context: ["/hubs"],
        target: "https://localhost:7020",
        secure: false,
        changeOrigin: true,
        ws: true,
      },
    ],
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { targets: "defaults" }],
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          env.production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new MiniCssExtractPlugin({
      filename: env.production
        ? "static/[name].[contenthash].css"
        : "[name].css",
    }),

    // evită suprascrierea întregului process.env în bundle:
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        env.production ? "production" : "development",
      ),
      "process.env.REACT_APP_API_BASE": JSON.stringify(
        process.env.REACT_APP_API_BASE || "",
      ),
    }),

    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ],
});
