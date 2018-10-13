const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

const PORT = 8000;
const HOST = 'localhost';

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(PORT, HOST, () => {
    var env = app.get('env');
    console.log(`${env.charAt(0).toUpperCase() + env.substring(1)} app listening at http://${server.address().address}:${server.address().port}`);
});