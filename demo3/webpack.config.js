"use strict";
const webpack = require("webpack");

const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// postcss
const cssvariables = require("postcss-css-variables");
const autoprefixer = require("autoprefixer");
const customMedia = require("postcss-custom-media");
const calc = require("postcss-calc");
const utilities = require("postcss-utilities");
const csso = require("postcss-csso");

// environment variables
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;
const PROXY_PORT = process.env.PROXY_PORT || 8081;

let useCssLoader, plugins, output, entry, devtool;

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins() {
      return [
        customMedia(),
        utilities,
        cssvariables({ variables: {} }),
        calc(),
        autoprefixer({
          browsers: ["last 222 version", "ie >= 8", "ff >= 17", "opera >=10"]
        }),
        csso({ restructure: false })
      ]
    }
  }
};

if (NODE_ENV === "production") {
  entry = "./src/index.js";
  output = {
    path: "dist",
    filename: "bundle.[hash].js"
  };
  devtool = 'eval-source-map';
  const extractCSS = new ExtractTextPlugin({
    filename: "styles.[contenthash].css",
    disable: false,
    allChunks: true
  });

  useCssLoader = extractCSS.extract({
    fallback: "style-loader",
    use: [{
      loader: "css-loader",
      options: {
        sourceMap: false
      }
    }, postcssLoader]
  });

  plugins = [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false,
        },
        output: {
          semicolons: false
        }
    }),
    new ManifestPlugin({
      fileName: "manifest.json"
    })
  ];
} else {
  entry = [
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`, // WebpackDevServer host and port
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ];
  output = {
    path: "/",
    filename: "bundle.js"
  };
  devtool = 'source-map';
  useCssLoader = [{
    loader: "style-loader"
  }, {
    loader: "css-loader",
    options: {
      sourceMap: false
    }
  }, postcssLoader];

  plugins = [];

}

module.exports = {
  entry,
  output,
  devtool,
  plugins,

  module: {
    rules: [{
      test: /\.css$/,
      use: useCssLoader,
      exclude: /\/node_modules\//
    }, {
      test: /\.css$/,
      use: useCssLoader,
      include: /\/node_modules\//
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      use: [{
        loader: "file-loader",
        options: {
          hash: "sha512",
          digest: "hex",
          name: "/[name]-[hash].[ext]"
        }
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: "file-loader",
        options: {
          limit: "10000",
          name: "/[name]-font-[hash].[ext]"
        }
      }]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+){1}$/,
      use: [{
        loader: "file-loader",
        options: {
          limit: "10000",
          name: "/[name]-font-[hash].[ext]"
        }
      }]
    }]
  },

  devServer: {
    port: PORT,
    historyApiFallback: false,
    hot: true,
    inline: true,
    proxy: {
      "/": {
        target: `http://localhost:${PROXY_PORT}`,
        secure: false
      }
    }
  },

}
