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

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blog-home', (req, res) => {
    res.render('blog-home');
});

app.get('/blog-single', (req, res) => {
    res.render('blog-single');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/elements', (req, res) => {
    res.render('elements');
});

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.get('/menu2', (req, res) => {
    res.render('menu2');
});

app.get('/team', (req, res) => {
    res.render('team');
});

server.listen(PORT, HOST, () => {
    var env = app.get('env');
    console.log(`${env.charAt(0).toUpperCase() + env.substring(1)} app listening at http://${server.address().address}:${server.address().port}`);
});