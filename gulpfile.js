const gulp = require('gulp')
const webpack = require('webpack')
const clientDev = require('./webpack.client-watch.js')
const clientProd = require('./webpack.client.js')
const serverDev = require('./webpack.server-watch.js')
const serverProd = require('./webpack.server.js')
const nodemon = require('nodemon')
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')

var running = false; //eslint-disable-line

function onBuild (done) {
  return function (err) {
    if (err) console.error(err) //eslint-disable-line
    // else console.log(stats.toString()) //eslint-disable-line
    if (done) done()
  }
}

gulp.task('build-backend', function (done) {
  webpack(serverProd).run(onBuild(done))
})

gulp.task('build-frontend', function (done) {
  webpack(clientProd).run(onBuild(done))
})

gulp.task('watch-frontend', function () {
  new WebpackDevServer(webpack(clientDev), {
    publicPath: clientDev.output.publicPath,
    hot: true
  }).listen(8080, 'localhost', function (err) {
    if (err) console.error(err) //eslint-disable-line
    else console.log('webpack running on localhost:8080') //eslint-disable-line
  })
})

gulp.task('watch-backend', function () {
  webpack(serverDev).watch(100, function (err, stats) {
    onBuild()(err, stats)
    if (running) {
      nodemon.restart()
    }
  })
})

gulp.task('build', ['build-backend', 'build-frontend'])
gulp.task('watch', ['watch-frontend', 'watch-backend'])

gulp.task('run', ['watch-backend', 'watch-frontend'], function () {
  running = true
  nodemon({
    execMap: { js: 'node' },
    script: path.join(__dirname, 'server/server'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function () {
    console.log('Restarted Hapi') //eslint-disable-line
  })
})
