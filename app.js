const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const server = require('http').Server(app);

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
    password: "bqQa4i99g0b22qr",
    database: "gh7db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    connection.query("SELECT id, name FROM country", function (err1, result1, fields1) {
        connection.query("SELECT id, name FROM city", function (err2, result2, fields2) {
            res.render('index', {
                title: 'Getting Started',
                states: result1,
                cities: result2
            });
        });
    });
});

app.get('/guides', (req, res) => {
    connection.query("SELECT first_name, last_name, bio, profile_pic_url FROM guide WHERE countryId = " + req.query.countryId + " AND cityId = " + req.query.cityId, function (err1, result1, fields1) {
        connection.query("SELECT name FROM country WHERE id = " + req.query.countryId, function (err2, result2, fields2) {
            res.render('guides', {
                title: 'Guides',
                guides: result1,
                country: result2[0].name
            });
        });
    });
});

app.get('/resources', (req, res) => {
    connection.query("SELECT title, info, url FROM resource", function (err, result, fields) {
        res.render('resources', {
            title: 'Resources',
            resources: result
        });
    });
});

app.get('/business', (req, res) => {
    res.render('business', {
        title: 'Business Resources'
    });
});

app.get('/community', (req, res) => {
    res.render('community', {
        title: 'Community Resources'
    });
});

app.get('/education', (req, res) => {
    res.render('education', {
        title: 'Educational Resources'
    });
});

app.get('/employment', (req, res) => {
    res.render('employment', {
        title: 'Employment Resources'
    });
});

app.get('/groceries', (req, res) => {
    res.render('groceries', {
        title: 'Grocery Resources'
    });
});

app.get('/refugee', (req, res) => {
    res.render('refugee', {
        title: 'Refugee Resources'
    });
});

app.get('/restaurants', (req, res) => {
    res.render('restaurants', {
        title: 'Restaurant Resources'
    });
});

app.get('/transportation', (req, res) => {
    res.render('transportation', {
        title: 'Transportation Resources'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

if (ENV === "production") {
    PORT = 8080;
    HOST = '0.0.0.0';
}

server.listen(PORT, HOST, () => {
    console.log(`${ENV.charAt(0).toUpperCase() + ENV.substring(1)} app listening at http://${server.address().address}:${server.address().port}`);
});