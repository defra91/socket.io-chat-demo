'use strict';

var socket = io('http://127.0.0.1:3000');

$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
})

socket.on('chat message', function(message) {
    $('#messages').append($('<li>').text(message));
});
