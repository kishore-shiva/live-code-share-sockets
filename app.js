const io = require('socket.io')(9001, {
    server: { listen: 9001, server_name: "http://192.168.1.32" },
    cors: {
      origin: '*',
    }
  });

room_name = []
current_room_name = ""

io.on('connection', socket => {
    console.log('connected with client');
    socket.emit('from-server', 'hello world');

    socket.on("client-data", data => {
      console.log('client has sent the data: '+data)
      socket.broadcast.emit('sent-data',data);
    })

    socket.on("login", room_id => {
    
      if(room_id in room_name){
        this.current_room_name = room_id;
      }
      else{
        this.current_room_name = room_id;
        room_name.push(room_id);
      }
      socket.broadcast.emit('room-name', room_id);
    })

    socket.on("editor-connected", data => {
      socket.emit('room-name',this.current_room_name);
    })
})