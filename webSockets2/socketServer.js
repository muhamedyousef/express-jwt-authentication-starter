const ws = require("ws").WebSocketServer;
const wsS = require("websocket-stream");
const fs = require("fs");
const Port = 8080;
const wss = new ws({ port: Port });
let express = require('express');
let app = new express();

wss.on("connection", (ws) => {
  /*let stream = wsS(ws)
  let rs = fs.createReadStream('foo.text');
  rs.pipe(stream,{end:false});*/
  ws.on('message',(data)=>{
     console.log(`recieved data : ${data}`);
  })
  ws.on("chat-message", (data) => {
    console.log(`recieved data : ${data}`);
  });
});

app.get('/', (req,res)=>{
    let writeStream = fs.createWriteStream('big.text');
    res.send(writeStream);
})


wss.on("messsage", (data) => {
  console.log(`recieved data : ${data.data}`);
});

console.log(`socketServer is listening on port ${Port}`);
