'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.send('<h1>Hello world</h1>');
});

app.use(function(req, res, next) {
    console.log(req.headers.host);
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:9000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('chat message', function(message) {
        console.log('Message sent: ', message);
        io.emit('chat message', message);
    });
});

server.listen(3000, function() {
    console.log('Listening on port 3000');
});
