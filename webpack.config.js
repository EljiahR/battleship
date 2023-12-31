const path = require('path');

module.exports = {
  entry: './src/',
  devtool: 'source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};