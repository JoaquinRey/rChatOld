const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const io = new Server(server);
const fs = require('fs');

const PORT = 3001;

const MSG_AMOUNT_CONST = 20;

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
        let path = 'database/' + message.channel_id + '.json';
        if (!fs.existsSync(path)) {
            console.log("does not exist");
            return;
        }

        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                console.log("Failed to read file");
                return
            }

            data = JSON.parse(data);
            data['messages'].push(message);
            data = JSON.stringify(data);

            fs.writeFileSync(path, data, (err) => {
                if (err) throw err;
            });
        });

        io.emit('message', message);
    });

    socket.on('notify-get-messages', channel_id => {
        let path = 'database/' + channel_id + '.json';
        console.log(channel_id)
        if (!fs.existsSync(path)) {
            console.log("does not exist");
            return;
        }

        fs.readFile(path, 'utf-8', (err, data) => {
            data = JSON.parse(data);
            num = data['messages'].length
            if (num < 10) {
                data = data['messages'];
            } else {
                data = data['messages'].slice(num - 11, num - 1);
            }
            console.log("pggers")
            socket.emit('server-messages', data);
        })
    })

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

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});