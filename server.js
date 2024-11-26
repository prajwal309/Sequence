const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {}; // Track connected users

app.use(express.static('public')); // Serve frontend files

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Add user to the chat
    socket.on('join', (username) => {
        users[socket.id] = username;
        io.emit('updateUsers', Object.values(users)); // Broadcast updated users
        socket.broadcast.emit('message', { user: 'System', text: `${username} joined the chat.` });
    });

    // Handle incoming messages
    socket.on('sendMessage', (message) => {
        const user = users[socket.id];
        io.emit('message', { user, text: message });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const user = users[socket.id];
        delete users[socket.id];
        io.emit('updateUsers', Object.values(users)); // Update user list
        io.emit('message', { user: 'System', text: `${user} left the chat.` });
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
