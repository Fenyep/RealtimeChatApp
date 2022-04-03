// importing express
const express = require('express')

// importing path
const path = require('path')

// creating an express app
const app = express()

// import of the http module and creation of a http server using our express app
const http = require('http').createServer(app)

// Middleware for the serving of the ./public files 
app.use(express.static(path.join(__dirname, 'public')))

// importing socket.io on the server
const io = require('socket.io')(http)

// A connection event is fired whenever a socket connection is ready
io.on('connection', socket => {
    console.log('Connection is Ready')

    // A sendMessage event is fired anytime a new msg data is ready
    socket.on('sendMessage', msg => {
        // console.log(msg)

        // send the message to all those connected
        socket.broadcast.emit('sendToAll', msg)
    })
})

// Configuration of the listening port
const PORT = process.env.PORT || 3000

// Rendering the server operational on the PORT
http.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
