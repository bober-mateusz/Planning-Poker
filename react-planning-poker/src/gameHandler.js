const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust as needed
        methods: ["GET", "POST"]
    }
});

const rooms = {};

io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
        if (!rooms[roomId]) rooms[roomId] = [];
        rooms[roomId].push(userId);
        socket.join(roomId);
        io.to(roomId).emit("update-room", rooms[roomId]);
    });

    socket.on("vote", (roomId, userVote) => {
        io.to(roomId).emit("vote-update", userVote);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(4000, () => console.log("Server running on port 4000"));
