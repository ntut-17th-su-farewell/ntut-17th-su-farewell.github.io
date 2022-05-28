const path = require("path")

const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { defaultMinimizerOptions } = require("html-loader")

const srcFolder = path.resolve("src")
const distFolder = path.resolve("dist")
const jsFileName = "index"
const cssFileName = "style"

module.exports = {
  entry: [path.resolve(srcFolder, "js", `${jsFileName}.ts`), path.resolve(srcFolder, "scss", `${cssFileName}.scss`)],
  output: {
    path: distFolder,
    filename: `${jsFileName}.js`,
  },
  resolve: {
    extensions: [".ts", "..."],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: {
            ...defaultMinimizerOptions,
            collapseInlineTagWhitespace: true,
            conservativeCollapse: false,
          },
          sources: { urlFilter: () => false },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({ patterns: [{ from: path.resolve("public"), to: distFolder }] }),
    new MiniCssExtractPlugin({ filename: `${cssFileName}.css` }),
  ],
  devServer: {
    static: { directory: "./" },
    compress: true,
    port: 80,
    historyApiFallback: true,
  },
}
