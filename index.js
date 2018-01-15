const express = require('express')
const path = require('path')
const socket = require('socket.io')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))


const server = app.listen(3000, (req, res) => {
	console.log('listening on port 3000')
})


let io = socket(server)



io.on('connection', (socket) => {
	console.log('made socket connection')

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data)
	})

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data)
	})
})
