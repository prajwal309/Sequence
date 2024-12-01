const socket = io();

// Prompt for username
const username = prompt('Enter your username');
socket.emit('join', username);

// Display connected users
socket.on('updateUsers', (users) => {
    const usersDiv = document.getElementById('gameLogs');
    usersDiv.innerHTML = `<strong>${users.join(', ')}</strong> joined the game.`;
    const playerStat = document.getElementById('playerName');
    playerStat.innerHTML = `Player : <strong>${users.join(', ')}</strong>`;
});

// Display messages
socket.on('message', ({ user, text }) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${user}:</strong> ${text}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
});

// Handle message input
const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim() !== '') {
        socket.emit('sendMessage', messageInput.value);
        messageInput.value = '';
    }
});
