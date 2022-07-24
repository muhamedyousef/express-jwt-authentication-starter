const ws = require('ws').WebSocket;
const wsc = new ws('ws://localhost:8080/');



wsc.on('open',()=>{
   wsc.send('hey there');
   wsc.emit('chat-message','hey there a message');
})
wsc.on('message',(data)=>{
    console.log(`recieved reply :  ${data}`)
})

wsc.emit('chat message','hey there a message')


//wsc.send('hey there');





