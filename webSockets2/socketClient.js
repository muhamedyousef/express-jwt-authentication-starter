//const ws = require('ws').WebSocket;
const wsStream = require("websocket-stream");
const fs = require("fs");

const writeStream = fs.createWriteStream("big.text");

writeStream.on("open", () => {
  const wsc = wsStream("ws://localhost:8080/");
  wsc.pipe(writeStream);
console.log(wsc.isPaused())

  wsc
    .on("error", (err) => {
      if (err) throw err;
    })
    .on("close", (err) => {
      if (err) throw err;
      console.log(`Closing ws with: ${fs.statSync("big.text").size} bytes`);
    });
});

writeStream.on("close", () => {
  console.log(`Closing file stream with: ${fs.statSync("big.text").size} bytes`);
});

//wsc.addListener('message',(data)=>{console.log(data.BYTES_PER_ELEMENT)})
