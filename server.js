const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const io = new Server(server);

const PORT = 3001;

var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Dev',
    participants: 0,
    id: 2,
    sockets: []
}];

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.67:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


io.on('connection', (socket) => {
    console.log("user connected");
    socket.emit('connection', null);

    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.sockets.indexOf(socket.id) == (-1)) {
                c.sockets.push(socket.id);
                c.participants++;
                io.emit('channel', c);
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index !== (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c)
                }
            }
        });

        return id;
    });

    socket.on('send-message', message => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log("user disconnected");
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index !== (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});

app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});