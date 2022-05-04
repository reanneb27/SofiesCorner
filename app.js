const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); 
const flash = require('connect-flash');

const User = require('./model/User');

const app = express();

const DBUri = 'mongodb+srv://admin:admin@cluster0.mh5yi.mongodb.net/sofies-corner?retryWrites=true&w=majority'; // request kenneth for URI
mongoose.connect(DBUri)
.then(result => app.listen(8888))
.catch(err => console.log(err));

// config / middlewares
app.set('view engine', 'ejs');

app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

app.use(express.urlencoded({extended: true}));

app.use(session({ 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false
}));

app.use(flash());


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
    const flashMsg = req.flash('success');

    res.render('login', {title: 'Login', flashObj: {flashType: 'error', message: flashMsg}});
});

app.get('/register', (req, res) => {
    const flashMsg = req.flash('error');
    
    res.render('register', {title: 'Register', flashObj: {flashType: 'error', message: flashMsg}});
});

app.post('/register', (req, res) => {
    const user = new User({
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        email: req.body['email'],
        password: req.body['password']
    });

    // check first if email already exists
    

    user.save()
    .then(result => {
        req.flash('success', 'Successfully Registered! You can login now.');
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
        req.flash('error', 'There was an error with your registration.');
        res.redirect('/register');
    });
});

app.get('/forgot_password', (req, res) => {
    res.render('forgot_password', {title: 'Forgot Password'});
});

app.get('/test', (req, res) => {
    console.log(req.session);
    req.flash('flashMsg', 'boyow');
    res.send('braaah test');
});