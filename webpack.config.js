var path = require('path'),
    webpack = require('webpack'),
    LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'build', 'js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.css$/, loader: 'style!css' },
      // webfont
      { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
      { test: /\.woff(\d+)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
    ]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx', 'es6'],
    moduleDirectories: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      exclude: /node_modules/
    }),
    new LiveReloadPlugin({ appendScriptTag: true })
  ]
};