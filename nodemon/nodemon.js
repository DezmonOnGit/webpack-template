var nodemon = require('nodemon');
const chokidar = require('chokidar');


let watcher = chokidar.watch('./src/pug/', {ignored: /(^|[\/\\])\../});

watcher.on('ready', (event, path) => {
  nodemon({
    script: './server/server.js',
    ext: 'pug',
    ignore: "*.*",
  });

  watcher.on('add', (event, path) => {
    console.log("Произошло добавление Pug файла, перезагружаем сервер");
    nodemon.emit('restart');
  });

  watcher.on('unlink', (event, path) => {
    console.log("Произошло удаление Pug файла, перезагружаем сервер");
    nodemon.emit('restart');
  });
});
