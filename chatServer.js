const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');
var uuid = require('uuid');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);



const clientsAr = [];

io.on('connection', client => {
    // console.log('connected', client);
    
    client.on('newClient', (clientc) => {        
        clientc.sid = client.id;
        clientsAr.push(clientc);
        console.log(clientsAr);
        client.broadcast.emit('newClientConnect', clientc);
        client.broadcast.emit('changeClientsNum', clientsAr.length);
    });

    client.on("disconnect", (reason) => {
        client.broadcast.emit('clientDisConnect', '');
        console.log('disconnect client with id: ', client.id );
        let index = clientsAr.findIndex( clientar => clientar.sid === client.id );
        console.log('client index disconnected in arr: ', index);
        clientsAr.splice(index, 1);
        client.broadcast.emit('changeClientsNum', clientsAr.length);
    });
        
    client.on('client-msg', (data) => {
        // console.log(data);
        const payload = {
            client: data.client,
            message: data.message
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
});
server.listen(5555);
