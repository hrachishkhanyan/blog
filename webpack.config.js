const path = require('path');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty',
    tls: 'empty'
  }
};

module.exports = config;
