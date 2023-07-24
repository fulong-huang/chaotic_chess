const ws = new require('ws');
const portNum = 3001;
const wss = new ws.Server({port: portNum});
const clients = new Set();

// possibly timeout 10(?) seconds to check if any client connected, 
//  if no clients are in the room then close it immediately

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`Port: ${portNum}, New Connection, currently ${clients.size} online`);
    ws.send('Welcome');
    ws.on('message', function(message_BINARY) {
        let message = String.fromCharCode(...message_BINARY);
        switch(message){
            // case message head:
            //case message penis:
            //      karate chop
            // EXP:
            // case message.startsWith('move'):
            //      check move, send move
            // case message.startsWith('name'):
            //      set client name
        }
        //sends message to clients
        for(let client of clients){
            client.send("Server received Message");
        }
        console.log('Received Message', message);
    });

    ws.on('close', () =>{
        console.log('Connection closed');
        clients.delete(ws);
        // //if(!clientName) return;
        // for(let client of clients){
        //     client.send(`${clientName} DISCONNECTED`);
        // }
        // if(clients.size === 0){
        //     console.log('CLOSE');
        //     wss.close();
        //     for(let i = 0; i < rooms.length; i++){
        //         if(rooms[i] === portNum){
        //             rooms.splice(i, 1);
        //             break;
        //         }
        //     }
        // }
    });

    // ws.on('Chess piece moved')
});
console.log('CREATED PORT: ', portNum);