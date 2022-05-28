const path = require("path")

const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const srcFolder = path.resolve("src")
const distFolder = path.resolve("public")
const jsFileName = "index.js"
const cssFileName = "style"

module.exports = {
  entry: [path.resolve(srcFolder, "js", jsFileName), path.resolve(srcFolder, "scss", `${cssFileName}.scss`)],
  output: {
    path: distFolder,
    filename: jsFileName,
  },
  plugins: [
    new CopyPlugin({ patterns: [{ from: path.resolve(srcFolder, "index.html"), to: distFolder }] }),
    new MiniCssExtractPlugin({ filename: `${cssFileName}.css` }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: { directory: distFolder },
    compress: true,
    port: 80,
    devMiddleware: {
      writeToDisk: filePath => /index.html$/.test(filePath),
    },
    historyApiFallback: true,
  },
}
