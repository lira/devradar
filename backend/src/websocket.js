const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io = socketio();
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        const { latitude, longetude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longetude),
            },
            techs: parseStringAsArray(techs)
        });
        // console.log(socket.id);
        // console.log(socket.handshake.query);

        // setTimeout(() => {
        //     socket.emit('message', 'Hello OmniStack')
        // }, 3000);


    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(items => techs.includes(item));
    })
};

exports.sendMessage = (to, message, data) => {
    to.ForEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}