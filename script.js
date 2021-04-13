const socket = io.connect('http://192.168.1.32:9001')
room_name = "";

socket.on('connection', data => {
    console.log('connected with the socket server')
})

socket.emit("editor-connected","a");


  socket.on('room-name', roomName => {
  console.log('got room name'+roomName)
  if(this.room_name == ""){
    this.room_name = roomName
    document.getElementById("roomname").innerHTML = "room name: "+roomName;
  }
})

socket.on('from-server' ,data => {
    console.log('Data sent from socket server: '+data);
})

socket.on('sent-data', data => {
    console.log("recieved from other client");
    this.editor.getDoc().setValue(data);
    highlightCode();
})

function sendMessage(message){
    message_data = message;
    //document.getElementById("display").value = "";
    socket.emit("client-data",message_data);

}

function highlightThis(){
    highlightCode();
    document.getElementById("code-block").focus()
}

function highlightCode(){
    document.querySelectorAll('div.code').forEach(block => {
        // then highlight each
        hljs.highlightBlock(block);
        });
}
highlightCode();

//Key pressed event:
window.addEventListener("keypress", keyPressed, false);
function keyPressed(key){
    sendMessage(this.editor.getValue() + String.fromCharCode(key.keyCode));
}

//Code editor script:
function getSelectValue(){
    var selected_lang = document.getElementById("cars").options[document.getElementById("cars").selectedIndex].value;

    if(selected_lang == "java"){
      document.getElementById("code-editor").innerHTML = '<textarea id="editor"></textarea>'
      this.editor = CodeMirror.fromTextArea(
      document.getElementById("editor"),{
        mode: "text/x-java",
        matchBrackets: true,
        theme: "night",
        lineNumbers: true,
        onKeyEvent: true
      }
    )
    this.editor.on("keyup", function(){
        sendMessage();
    })
    this.editor.setSize('100%','600');
    }
    else if(selected_lang == "python"){
      document.getElementById("code-editor").innerHTML = '<textarea id="editor"></textarea>'
      this.editor = CodeMirror.fromTextArea(
      document.getElementById("editor"),{
        mode: "python",
        theme: "night",
        lineNumbers: true
      }
    )
    this.editor.setSize('100%','600');
    }
    else if(selected_lang == "C++"){
      document.getElementById("code-editor").innerHTML = '<textarea id="editor"></textarea>'
        this.editor = CodeMirror.fromTextArea(
        document.getElementById("editor"),{
          mode: "text/x-csrc",
          theme: "night",
          lineNumbers: true
        }
      )
      this.editor.setSize('100%','600');
    }
    else if(selected_lang == "C"){
      document.getElementById("code-editor").innerHTML = '<textarea id="editor" ></textarea>'
        this.editor = CodeMirror.fromTextArea(
        document.getElementById("editor"),{
          mode: "text/x-csrc",
          theme: "night",
          lineNumbers: true
        }
      )
      this.editor.setSize('100%','600');
      }
    
}
    var selected_lang = document.getElementById("cars").options[document.getElementById("cars").selectedIndex].value;
    var editor;

    if(selected_lang == "java"){
      document.getElementById("code-editor").innerHTML = '<textarea id="editor" onkeyup="sendMessage()"></textarea>'
      this.editor = CodeMirror.fromTextArea(
      document.getElementById("editor"),{
        mode: "text/x-java",
        matchBrackets: true,
        theme: "night",
        lineNumbers: true,
        autofocus: true
      }
    )
    this.editor.setSize('100%','600');
    }
    else if(selected_lang == "python"){
      this.editor = CodeMirror.fromTextArea(
      document.getElementById("editor"),{
        mode: "python",
        theme: "night",
        lineNumbers: true
      }
    )
    this.editor.setSize('100%','600');
    }

