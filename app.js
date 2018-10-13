const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var PORT = 8000;
var HOST = 'localhost';
const ENV = app.get('env');

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var connection = mysql.createConnection({
  host: "gh7.cisrmnpfjjvc.us-east-2.rds.amazonaws.com",
  user: "admindb",
  password: "bqQa4i99g0b22qr"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/getstarted', (req, res) => {
    res.render('getstarted', { title: 'Get Started' });
});

app.get('/elements', (req, res) => {
    res.render('elements', { title: 'Get Started' });
});

app.get('/menu', (req, res) => {
    res.render('menu', { title: 'Get Started' });
});

app.get('/guides', (req, res) => {
    res.render('guides', { title: 'Guides' });
});

app.get('/resources', (req, res) => {
    res.render('resources', { title: 'Resources' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // default username
    socket.username = "Anonymous";

    // listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
        // broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    });
});

if (ENV === "production") {
    PORT = 8080;
    HOST = '0.0.0.0';
}

server.listen(PORT, HOST, () => {
    console.log(`${ENV.charAt(0).toUpperCase() + ENV.substring(1)} app listening at http://${server.address().address}:${server.address().port}`);
});