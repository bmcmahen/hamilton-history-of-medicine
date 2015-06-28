const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

var nodeModules = {} //eslint-disable-line

fs.readdirSync('node_modules')
  .forEach(function getName (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })


/**
 * Webpack server-side code -> Production
 * @type {Object}
 */

module.exports = {
  target: 'node',
  context: __dirname,
  entry: ['./src/server/index.js'],
  devtool: false,
  debug: false,
  output: {
    path: path.join(__dirname, 'server/'),
    filename: 'server.js',
    publicPath: '/assets/'
  },
  externals: nodeModules,
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __STATIC_URL__: '/'
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: "'production'" }}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
		loaders: [
			{include: /\.json$/, loaders: ['json-loader']},
			{include: /\.js$/, loaders: ['babel-loader?stage=0&optional=runtime'], exclude: /node_modules/},
      {include: /\.(png|jpg)$/, loader: 'file-loader?name=[hash].[ext]' }
		]
	},
  resolve: {
    extensions: ['', '.json', '.js']
  },
  node: {
    __dirname: true,
    __filename: true
  }
}
