const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

/*
	The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.
*/

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chat message", (msg) => {
    console.log(msg);

    // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
    // This will emit the event to all connected sockets

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
