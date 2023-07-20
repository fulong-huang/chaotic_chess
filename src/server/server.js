const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});
app.use(cors({origin: 'http://localhost:3000', credentials: true}))

io.on('connection', (socket) => { 
    // let userName = undefined;
    console.log("user Connected")
    socket.on("disconnect", () => {
        console.log("user Disconnected")
    })
    socket.on("hello!", (data) => {
        console.log("hello!")
        io.emit("message", data);
    }
    )
})

server.listen(PORT, () => console.log('Server running on port ' + PORT));