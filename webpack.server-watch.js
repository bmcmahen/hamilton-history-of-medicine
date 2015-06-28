const webpack = require('webpack')
const config = require('./webpack.server.js')

config.plugins = [
  new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
  new webpack.BannerPlugin('require("source-map-support").install();', {
    raw: true, entryOnly: false
  }),
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __STATIC_URL__: '/'
  }),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: "'development'" }}),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
]

config.devtool = 'sourcemap'

module.exports = config
