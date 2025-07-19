import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default (env = {}) => ({
  mode: env.production ? "production" : "development",

  entry: "./src/main.tsx",

  output: {
    path: path.resolve("dist"),
    filename: env.production ? "static/[name].[contenthash].js" : "bundle.js",
    publicPath: "/",
    clean: true
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: { fs: false, path: false }      // silence node-core warnings
  },

  devtool: env.production ? "source-map" : "eval-source-map",

  devServer: {
    static: { directory: path.resolve("public") },
    historyApiFallback: true,
    hot: true,
    port: 3000
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
            "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          env.production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new MiniCssExtractPlugin({
      filename: env.production ? "static/[name].[contenthash].css" : "[name].css"
    })
  ]
});
