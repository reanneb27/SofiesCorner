require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const User = require('./model/User');

const app = express();

const DBUri = process.env.MONGODB_URI;

mongoose.connect(DBUri)
.then(result => app.listen(process.env.PORT))
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

    res.render('login', {title: 'Login', flashObj: {type: flashType, message: flashMsg}});
});

app.post('/login', unauthedOnly, async (req, res) => {
    const {email, password} = req.body;

    // check if email exists first
    const existingUser = await User.findOne({email});

    if (!existingUser) {
        req.flash('type', 'error');
        req.flash('message', 'Email or Password is wrong or does not exist!');
        req.session.save(() => res.redirect('/login'));
    } else {
        // now check if password matches the hashed password in database
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            req.flash('type', 'error');
            req.flash('message', 'Email or Password is wrong or does not exist!');
            req.session.save(() => res.redirect('/login'));
        } else {
            req.flash('type', 'success');
            req.flash('message', 'Successfully logged in!');
            req.session.isAuth = true;
            req.session.save(() => res.redirect('/account_profile'));
        }
    }
});

app.post('/logout', authedOnly, (req, res) => {
    req.flash('type', 'success');
    req.flash('message', 'Successfully logged out!');
    req.session.isAuth = false;
    req.session.save(() => res.redirect('/login'));
});

app.get('/register', unauthedOnly, (req, res) => {
    const flashType = req.flash('type')
    const flashMsg = req.flash('message');
    
    res.render('register', {title: 'Register', flashObj: {type: flashType, message: flashMsg}});
});

app.post('/register', unauthedOnly, async (req, res) => {
    const {first_name, last_name, email, password } = req.body;

    // check first if email already exists
    const existingUser = await User.findOne({email});
    
    if (existingUser){
        req.flash('type', 'error');
        req.flash('message', 'Email already exists!');
        req.session.save(() => res.redirect('/register'));
    } else {
        try {
            // hash password first
            let hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword
            });

            await user.save();
            req.flash('type', 'success');
            req.flash('message', 'Successfully Registered! You can login now.');

            req.session.save(() => res.redirect('/login'));
        } catch(err) {
            console.log(err);
            req.flash('type', 'error');
            req.flash('message', 'There was an error with your registration.');
            req.session.save(() => res.redirect('/register'));
        };
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


// test routes
// app.get('/test', (req, res) => {
//     console.log(req.session);
//     req.flash('flashMsg', 'boyow');
//     res.send('braaah test');
// });