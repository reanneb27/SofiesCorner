const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const User = require('./model/User');

const app = express();

const DBUri = ''; // request kenneth for URI
mongoose.connect(DBUri)
.then(result => app.listen(8888))
.catch(err => console.log(err));

const store = new MongoDbSession({
    uri: DBUri,
    collection: "mySessions"
});

// config / middlewares
app.set('view engine', 'ejs');

app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

app.use(express.urlencoded({extended: true}));

app.use(session({ 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false,
    store: store
}));

app.use(flash());

// custom middlewares
// redirect back to login page if an unauthenticated user tries to access pages only authenticated users can view (account settings, checkout payment, etc...)
const authedOnly = (req, res, next) => {
    if (req.session.isAuth)
        next();
    else
        res.redirect('/login');
}
// redirect back to account_profile page if an authenticated user tries to access pages only unauthenticated users can view (login, register, etc...)
const unauthedOnly = (req, res, next) => {
    if (req.session.isAuth)
        res.redirect('/account_profile');
    else
        next();
}

// routes
app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    if (req.session.isAuth)
        console.log('wottt');
    res.render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us'});
});

app.get('/plants', (req, res) => {
    res.render('plants', {title: 'Plants'});
});

app.get('/login', unauthedOnly, (req, res) => {
    const flashType = req.flash('type')
    const flashMsg = req.flash('message');
    console.log("Flash Type: " + flashType + "\nFlash Message: " + flashMsg);
    res.render('login', {title: 'Login', flashObj: {type: flashType, message: flashMsg}});
});

app.post('/login', unauthedOnly, async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        req.flash('type', 'error');
        req.flash('message', 'Email or Password is wrong or does not exist!');
        res.redirect('/login');
    }
    else {
        req.session.isAuth = true;
        req.flash('type', 'success');
        req.flash('message', 'Successfully logged in!');
        res.redirect('/account_profile');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {

        // TODO: research how to make session manually,
        // because I can't add flash messages after destroying session
        // create new session
        console.log('session deleted! ' + req.session);

        // add new session creation code here
        
        console.log('created new session: ');

        res.redirect('/login');
    });
});

app.get('/register', unauthedOnly, (req, res) => {
    const flashType = req.flash('type')
    const flashMsg = req.flash('message');
    
    res.render('register', {title: 'Register', flashObj: {type: flashType, message: flashMsg}});
});

app.post('/register', unauthedOnly, async (req, res) => {
    const email = req.body['email'];
    const user = new User({
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        email: req.body['email'],
        password: req.body['password']
    });

    // check first if email already exists
    const existingUser = await User.findOne({email});
    
    if (!existingUser){
        try {
            await user.save();
            req.flash('type', 'success');
            req.flash('message', 'Successfully Registered! You can login now.');
            res.redirect('/login');
        } catch(err) {
            console.log(err);
            req.flash('type', 'error');
            req.flash('message', 'There was an error with your registration.');
            res.redirect('/register');
        };
    }
    else {
        req.flash('type', 'error');
        req.flash('message', 'Email already exists!');
        res.redirect('/register');
    }
    
});

app.get('/forgot_password', unauthedOnly, (req, res) => {
    res.render('forgot_password', {title: 'Forgot Password'});
});


app.get('/account_profile', authedOnly, (req, res) => {
    const flashType = req.flash('type');
    const flashMsg = req.flash('message');

    res.render('account_profile', {title: 'Profile', flashObj: {type: flashType, message: flashMsg}});
})

app.get('/test', (req, res) => {
    console.log(req.session);
    req.flash('flashMsg', 'boyow');
    res.send('braaah test');
});