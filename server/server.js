const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('../configs/webpack.dev.config.js');
const options = {
  hot: true,
  host: 'localhost',
  contentBase: './src/pug/',
  watchContentBase: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
  console.log('dev server listening on port 3000');
});
