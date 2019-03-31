"use strict";

const fs = require("fs");
const path = require("path");

const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CheckEsVersionPlugin } = require("@bitjourney/check-es-version-webpack-plugin");
const { gzip } = require("@gfx/zopfli");

const isProduction = ["production", "staging"].includes(process.env.NODE_ENV);

const devServerPort = 3808;
const assetDir = "assets";

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    application: [
      "core-js",
      "./frontend/application.ts",
    ],
  },

  output: {
    publicPath: `/${assetDir}/`,
    path: `${__dirname}/../public/${assetDir}`,

    filename: isProduction ? "[name]-[chunkhash].js" : "[name].js",
  },

  resolve: {
    modules: [`${__dirname}/../frontend`, `node_modules`],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {},
  },

  node: {
    __filename: true,
    __dirname: true,
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ManifestPlugin({
      writeToFileEmit: isProduction,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
            transpileOnly: !isProduction,
          },
        },
      },
    ],
  },
};

if (isProduction) {
  config.optimization = {
    noEmitOnErrors: true,
    minimize: process.env.MINIMIZE !== "false",
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  };
  config.plugins.push(
    new CompressionPlugin({
      algorithm: gzip,
    }),
    new CheckEsVersionPlugin({
      esVersion: 5, // for IE11 support
    }),
  );
  config.devtool = "source-map";
} else {
  config.devServer = {
    port: devServerPort,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: "minimal",
    disableHostCheck: true,
  };
  config.output.publicPath = `//localhost:${devServerPort}/${assetDir}/`;

  config.devtool = "cheap-source-map";
}

module.exports = config;
