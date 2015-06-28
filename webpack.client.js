const webpack = require('webpack')
const path = require('path')

module.exports = {
  target: 'web',
  cache: false,
  context: __dirname,
  devtool: false,
  entry: ['./src/client/index.js'],
  output: {
    path: path.join(__dirname, 'static/'),
    filename: 'client.js',
    chunkFilename: '[name].[id].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
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
		modulesDirectories: [
			'src',
			'node_modules',
			'web_modules'
		],
		extensions: ['', '.json', '.js']
	},
	node: {
		__dirname: true,
		fs: 'empty'
	}
}
