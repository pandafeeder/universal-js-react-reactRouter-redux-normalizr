const path = require('path')
const webpack = require('webpack')


module.exports = {
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    filename: 'client_entry.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
}
