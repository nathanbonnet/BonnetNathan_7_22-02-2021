const path = require('path');

var config = {
  module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: [
              'style-loader',
              'css-loader',
              'sass-loader',
              ],
          },
      ],
  },
};

var indexConfig = Object.assign({}, config, {
  name: "index",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: "index.bundle.js"
  },
});


// Return Array of Configurations
module.exports = [
  indexConfig
];