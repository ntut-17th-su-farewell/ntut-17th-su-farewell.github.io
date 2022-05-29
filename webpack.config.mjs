import path from "path"

import CopyPlugin from "copy-webpack-plugin"
import { defaultMinimizerOptions } from "html-loader"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const srcFolder = path.resolve("src")
const distFolder = path.resolve("dist")
const jsFileName = "index"
const cssFileName = "style"

export default {
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
    static: { directory: distFolder },
    compress: true,
    port: 80,
    historyApiFallback: true,
  },
}
