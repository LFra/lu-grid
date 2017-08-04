const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './docs/app.js',

  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js'
  },

  resolve: {
    alias: {
      'lu-grid': path.join(__dirname, 'src/index.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ],

    loaders: [
        { test: /\.json$/, loader: "json"}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  externals: {
    // 'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  devServer: {
    contentBase: 'docs/' 
  }
}
