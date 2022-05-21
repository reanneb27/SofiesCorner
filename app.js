require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session);
const sendgrid = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
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

app.post('/forgot_password', unauthedOnly, (req, res) => {
    const {email} = req.body;
    // sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //     to: email, // Change to your recipient
    //     from: process.env.MY_SECRET_EMAIL, // Change to your verified sender
    //     subject: 'Sending with SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };
    // const msg2 = {
    //     from: {
    //         email: process.env.MY_SECRET_EMAIL,
    //         name: 'senderTest'
    //     },
    //     to: {
    //         email: email,
    //         name: 'recieverTest'
    //     },
    //     subject: 'Just testing subject',
    //     text: 'body text',
    //     html: '<strong>body text</strong>',
    //     templateId: 'd-2e3f502a238b4b4fa59d8e754c6a2688',
    //     dynamicTemplateData: {
    //         name: 'dynamicName'
    //     }
    // };

    // sendgrid.send(msg)
    // .then(success => {
    //     res.send("email sent to: " + email + "\n" + JSON.stringify(success));
    //     console.log(JSON.stringify(success));
    // })
    // .catch(err => {
    //     res.send("unable to send email to " + email + "\n" + JSON.stringify(err));
    //     console.log(JSON.stringify(err));
    // });
    var randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_EMAIL_PASS
        }
    });
    const options = {
        from: process.env.OUTLOOK_EMAIL,
        to: email,
        subject: "Reset Password | Sofies Corner",
        text: 'Your new password is: ' + randPassword + '. You can now login with this password and change it.'
    };

    transporter.sendMail(options, async (err, info) => {
        if (err){
            console.log(err);
            req.flash('type', 'error');
            req.flash('message', 'Unable to send password reset to ' + email + '.');

            req.session.save(() => res.redirect('/register'));
        }
        else {
            // check first if email already exists
            const existingUser = await User.findOne({email});
            if (existingUser){
                // hash password first
                let hashedPassword = await bcrypt.hash(randPassword, 10);
                
                User.findOneAndUpdate({email: email}, {password: hashedPassword}, (err, data) => {
                    if (err)
                        console.log(err);
                    else
                        console.log(data);
                });

            }

            console.log('Sent email to: ' + email);
            req.flash('type', 'success');
            req.flash('message', 'Successfully sent password reset to ' + email + '!');

            req.session.save(() => res.redirect('/login'));
        }
    })
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

// 404 page
app.use((req, res) => {
    res.render('error_page', {title: '404'});
});

