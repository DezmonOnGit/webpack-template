const chokidar = require('chokidar');

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('../configs/webpack.dev.config.js');
const express = require('express');
const app = express();

function startServer() {
  const compiler = webpack(webpackConfig);
  let instance = middleware(compiler);

  app.use(instance);

  let server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

  obj.on('add', (event, path) => {
    // startServer();
    instance.close(function() {
      server.close(function() {
        instance = middleware(compiler);
        app.use(instance);
        server = app.listen(3000, () => console.log('Example app listening on port 3000!'));
      });
    });
  });

  obj.on('unlink', (event, path) => {
    // app.removeAllListeners();
    // console.log(event, path);
    instance.close(function() {
      server.close(function() {
        instance = middleware(compiler);
        app.use(instance);
        server = app.listen(3000, () => console.log('Example app listening on port 3000!'));
      });
    });
    // startServer();
  });
}

let obj = chokidar.watch('./src/pug/', {ignored: /(^|[\/\\])\../});

obj.on('ready', (event, path) => {
  startServer();
});
