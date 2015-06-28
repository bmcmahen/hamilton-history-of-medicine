const webpack = require('webpack')
const config = require('./webpack.client.js')

config.cache = true
config.debug = true
config.devtool = 'eval'

config.entry.unshift(
	'webpack-dev-server/client?http://localhost:8080',
	'webpack/hot/only-dev-server'
)

config.output.publicPath = 'http://localhost:8080/'
config.output.hotUpdateMainFilename = 'update/[hash]/update.json'
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js'

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.HotModuleReplacementPlugin({ quiet: true }),
	new webpack.NoErrorsPlugin()
]

config.module = {
	loaders: [
		{include: /\.css$/, loader: 'style-loader!css-loader' },
		{include: /\.json$/, loaders: ['json-loader']},
		{include: /\.js$/, loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime'], exclude: /node_modules/},
		{include: /\.(png|jpg)$/, loader: 'file-loader?name=[hash].[ext]' }
	]
}

config.devServer = {
	publicPath: 'http://localhost:8080/',
	contentBase: './static',
	hot: true,
	inline: true,
	lazy: false,
	quiet: true,
	noInfo: false,
	headers: {'Access-Control-Allow-Origin': '*'},
	stats: {colors: true}
}

module.exports = config
