var nodemon = require('nodemon');
const chokidar = require('chokidar');


let obj = chokidar.watch('./src/pug/', {ignored: /(^|[\/\\])\../});

obj.on('ready', (event, path) => {
  nodemon({
    script: './server/server.js',
    ext: 'pug',
    ignore: "*.*",
  });

  obj.on('add', (event, path) => {
    console.log("Произошло добавление Pug файла, перезагружаем сервер");
    nodemon.emit('restart');
  });

  obj.on('unlink', (event, path) => {
    console.log("Произошло удаление Pug файла, перезагружаем сервер");
    nodemon.emit('restart');
  });
});
