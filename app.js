const express = require('express');
const mongoose = require('mongoose');

const User = require('./model/User');

const app = express();

const DBUri = ''; // request kenneth for URI
mongoose.connect(DBUri)
.then(result => app.listen(8888))
.catch(err => console.log(err));

// config / middlewares
app.set('view engine', 'ejs');

app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

app.use(express.urlencoded({extended: true}));

// routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});

app.get('/plants', (req, res) => {
    res.render('plants', {title: 'Plants'});
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
});

app.get('/register', (req, res) => {
    res.render('register', {title: 'Register'});
});

app.post('/register', (req, res) => {
    res.send('ADDED TO DATABASE<br>'+JSON.stringify(req.body));
    const user = new User({
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        email: req.body['email'],
        password: req.body['password']
    });
    user.save()
    .then(result => {

    })
    .catch(err => {
        console.log(err);
    });
});

app.get('/forgot_password', (req, res) => {
    res.render('forgot_password', {title: 'Forgot Password'});
});
