var socket = io();
  function sendFunction() {
    socket.emit('new message', $('#new-message').val());
    $('#new-message').val('');
  }
  socket.on('chat message', function(msg){
    $('#messages-area').append($('<li>').text(msg));
  });
