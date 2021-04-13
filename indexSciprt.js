const socket = io.connect('http://192.168.1.32:9001')

socket.on('connection', data => {
    console.log('connected with the socket server')
})

socket.on('from-server' ,data => {
    console.log('Data sent from socket server: '+data);
})

function login(){
    let room_id = document.getElementById("roomid").value;
    if(room_id == ""){
        document.getElementById("error").innerHTML = "* room name cannot be empty"
        return
    }
    else{
        socket.emit("login", room_id);
        location.replace('./codeEditor.html');
    }
    socket.emit("login-in", room_id);
}