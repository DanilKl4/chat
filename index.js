let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

let PORT = process.env.PORT || 80;

server.listen(PORT);
users = [];
connections = [];

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', function(socket){
    console.log('Соединение прошло успешно!');
    connections.push(socket);
    
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Пользователь отключился')
    });

    socket.on('send msg', function(data, name) {
        io.sockets.emit('add msg', data, name);
    })
});