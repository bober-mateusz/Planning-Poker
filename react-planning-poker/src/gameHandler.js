const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust as needed
    methods: ['GET', 'POST'],
  },
});

const rooms = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomID, userID) => {
    if (!rooms[roomID]) rooms[roomID] = [];
    rooms[roomID].push(userID);
    socket.join(roomID);
    io.to(roomID).emit('update-room', rooms[roomID]);
  });

  socket.on('vote', (roomID, userVote) => {
    io.to(roomID).emit('vote-update', userVote);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));
