const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);

var PORT = 8000;
var HOST = 'localhost';

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/getstarted', (req, res) => {
    res.render('getstarted', { title: 'Get Started' });
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

var env = app.get('env');

if (env === "production") {
    PORT = 8080;
    HOST = '0.0.0.0';
}

server.listen(PORT, HOST, () => {
    var env = app.get('env');
    console.log(`${env.charAt(0).toUpperCase() + env.substring(1)} app listening at http://${server.address().address}:${server.address().port}`);
});