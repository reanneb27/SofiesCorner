const express = require('express');

const app = express();

// config
app.set('view engine', 'ejs');

app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));


// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/plants', (req, res) => {
    res.render('plants');
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/forgot_password', (req, res) => {
    res.render('forgot_password')
});

// start listening
app.listen(8888);
