$(function () {
    // make connection
    var socket = io.connect('http://localhost:3000');

    // buttons and inputs
    var message = $("#messages");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");

    // emit message
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() });
    });

    // listen on new_message
    socket.on('new_message', (data) => {
        console.log(data);
    });

    // emit a username
    send_username.click(function () {
        console.log(username.val());
        socket.emit('changeg_username', { username: username.val() });
    });
});