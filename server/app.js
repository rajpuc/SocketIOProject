import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";
import cors from "cors";
const port  = 3000;
const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});


io.on("connection",(socket)=>{
    console.log("user connected");
    // console.log("ID", socket.id);
    // socket.emit("welcome",`Welcome to the server ${socket.id}`);
    // socket.broadcast.emit("welcome",`Welcome to the server ${socket.id}`);
    // socket.broadcast.emit("welcome",`${socket.id} joined the server.`);
    
    socket.on("message",(data)=>{
        // console.log(data)
        // io.emit("receive-message",data);
        // console.log("Received message: ", data);
        // io.emit("receive-message", data);
         io.to(data.room).emit("receive-message",data.message);
    });
    
    socket.on("disconnect",()=>{
        console.log(`${socket.id} User Disconnected`);
    });
})



app.get("/",(req,res)=>{
    res.send("Hello World!");
});

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});