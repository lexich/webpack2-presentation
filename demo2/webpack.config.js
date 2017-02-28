const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;

const plugins = [];

if (NODE_ENV === 'production') {
  plugins[plugins.length] = 
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false,
        },
        output: {
          semicolons: false
        }
    });
}

module.exports = {
    entry: "./src/index.js",
    target: "node",
    plugins: plugins
}