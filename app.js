const express = require('express');
const socketio = require('socket.io');
const app = express() // call Express and store to app

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...")
});

// Initialize socket the server 
const io = socketio(server)  // Install socket for server 

// If who is connected => console.log
io.on('connection', socket => {
    console.log("New user connected");

    socket.user = "Anonymous";

    socket.on("change_username", data => {
        socket.user = data.username
    })

    // handle the new messsage  event
    socket.on("new_message", data => {
        console.log("new message");
        io.sockets.emit("receive_message", { message: data.message, username: socket.user, dateTime: data.dateTime })
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.user });
    })
});