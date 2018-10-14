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
  password: "bqQa4i99g0b22qr"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Getting Started' });
});

app.get('/guides', (req, res) => {
    res.render('guides', { title: 'Guides' });
});

app.get('/resources', (req, res) => {
    var resources = [
        {
            title: "Business",
            info: "As a foreign student, you need XYZ.",
            link: "resources/business"
        },
        {
            title: "Community",
            info: "Usage of the Internet is becoming more common due to rapid advance. Usage of the Internet is becoming more common due to rapid advance.",
            link: "resources/community"
        },
        {
            title: "Education",
            info: "As a foreign student, you need XYZ.",
            link: "resources/education"
        },
        {
            title: "Employment",
            info: "Usage of the Internet is becoming more common due to rapid advance. Usage of the Internet is becoming more common due to rapid advance.",
            link: "resources/employment"
        },
        {
            title: "Groceries",
            info: "Usage of the Internet is becoming more common due to rapid advance. Usage of the Internet is becoming more common due to rapid advance.",
            link: "resources/groceries"
        },
        {
            title: "Refugee",
            info: "As a foreign student, you need XYZ.",
            link: "resources/refugee"
        }
    ];
    
    res.render('resources', { title: 'Resources', resources: resources });
});

app.get('/resources/business', (req, res) => {
    res.render('resources/business', { title: 'Business Resources' });
});

app.get('/resources/community', (req, res) => {
    res.render('resources/community', { title: 'Community Resources' });
});

app.get('/resources/education', (req, res) => {
    res.render('resources/education', { title: 'Educational Resources' });
});

app.get('/resources/employment', (req, res) => {
    res.render('resources/employment', { title: 'Employment Resources' });
});

app.get('/resources/groceries', (req, res) => {
    res.render('resources/groceries', { title: 'Grocery Resources' });
});

app.get('/resources/refugee', (req, res) => {
    res.render('resources/refugee', { title: 'Refugee Resources' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

if (ENV === "production") {
    PORT = 8080;
    HOST = '0.0.0.0';
}

server.listen(PORT, HOST, () => {
    console.log(`${ENV.charAt(0).toUpperCase() + ENV.substring(1)} app listening at http://${server.address().address}:${server.address().port}`);
});