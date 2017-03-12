require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')//Path就是node.js提供的API，提供一些文件路径操作的方法
var express = require('express')//Express是node.js的一个框架，这里用它去启动一个webserver
var webpack = require('webpack')//Webpack就是核心编译工具，直接用node.js提供的API，而不用全局的webpack
var proxyMiddleware = require('http-proxy-middleware')//proxyMiddleware就是HTTP代理的一个中间件，可以代理和转发API
var webpackConfig = require('./webpack.dev.conf')//WebpackConfig就是webpack的相关配置，这里由于是一个开发时的配置，所以它是依赖webpack.dev.conf

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express();
var compiler = webpack(webpackConfig);
var appData=require('../data.json');
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings;
var apiRoutes=express.Router();

apiRoutes.get('/seller',function(req,res){
  res.json({
    errno:0,
    data:seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  });
});

apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno:0,
    data:ratings
  });
});
app.use('/api',apiRoutes);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
