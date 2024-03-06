const express = require("express")
const path = require("path")
const app = express();

const server = require("http").createServer(app)
const io = require("socket.io")(server)
app.use(express.static(path.join(__dirname + "/views")))

io.on("connection",function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update", username + " joined the conversion")
    })
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", " left the conversion")
    })
    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message)
    })
    console.log("connected");
})
 
server.listen(8090,()=>{
    console.log("Listening port on 8090");
})