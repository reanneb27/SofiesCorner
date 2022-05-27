require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoDbSession = require('connect-mongodb-session')(session);
const sendgrid = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const flash = require('connect-flash');

const User = require('./model/User');
const Plant = require('./model/Plant');

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
app.use(express.json()); // support json encoded bodies

app.use(session({ 
    secret: 'woot',
    cookie : {
        maxAge: 1000* 60 * 60 * 24 * 30 // 1 month
    },
    resave: false, 
    saveUninitialized: false,
    store: store
}));

app.use(cookieParser());

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
    res.render('index', {title: 'Home', first_name: req.session.first_name, cart: req.session.cart});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us', first_name: req.session.first_name, cart: req.session.cart});
});

app.get('/plants', async (req, res) => {
    console.log(req.cookies);
    // get search query
    let searchQuery = 'query' in req.query ? req.query['query'] : '';
    searchQuery = searchQuery.toLowerCase();

    // get categories to search
    let categoryJSON = {"succulentwithpots":false,"succulentwithoutpots":false,"mooncactus":false,"airplants":false,"hangingplants":false,"pots":false};
    if ('categories' in req.cookies)
        categoryJSON = JSON.parse(req.cookies.categories);
    
    let categoryFilter = [];
    Object.keys(categoryJSON).forEach(key => {
        console.log(key);
        if (categoryJSON[key])
            categoryFilter.push(key.replaceAll(' ', '').toLowerCase());
    })

    if (categoryFilter.length == 0){
        Object.keys(categoryJSON).forEach(key => {
            categoryFilter.push(key.replaceAll(' ', '').toLowerCase());
        });
    }


    // get price to search
    let priceFilter = "one";
    if ('price' in req.cookies)
        priceFilter = req.cookies['price'].replaceAll(' ', '').toLowerCase();

    // get all products first
    const plants = await Plant.find();

    // filters the products
    // filter by search query
    let firstFilter = [];
    if (searchQuery != ''){
        plants.forEach(plant => {
            if (plant.plant_name.toLowerCase().includes(searchQuery)){
                firstFilter.push(plant);
            } 
        });
    }
    else firstFilter = plants;

    // filter by category
    let secondFilter = [];
    firstFilter.forEach(plant => {
        if (categoryFilter.includes(plant.plant_type.replaceAll(' ', '').toLowerCase()))
        secondFilter.push(plant);
    });
    
    // filter by price
    let thirdFilter = [];
    if (priceFilter != 'one'){
        secondFilter.forEach(plant => {
            switch (priceFilter){
                case 'two': // below PHP 100
                    if (plant.price < 100)
                        thirdFilter.push(plant);
                    break;
                case 'three': // PHP 100 - PHP 300
                    if (plant.price >= 100 && plant.price <= 300)
                        thirdFilter.push(plant);
                    break;
                case 'four': // PHP 300+
                    if (plant.price > 300)
                        thirdFilter.push(plant);
                    break;
            }
        });
    }
    else thirdFilter = secondFilter;

    // finally, sort the products
    let sortOption = req.cookies['sortOption'];
    if (!sortOption){
        sortOption = 'Alphabetically, A-Z';
    }
    switch (sortOption){
        case 'Alphabetically, A-Z':
            thirdFilter.sort((a, b) => a.plant_name.localeCompare(b.plant_name));
            break;
        case 'Alphabetically, Z-A':
            thirdFilter.sort((a, b) => a.plant_name.localeCompare(b.plant_name)).reverse();
            break;
        case 'Price, low to high':
            thirdFilter.sort((a, b) => {
                if (parseFloat(a.price.toString()) < parseFloat(b.price.toString())) return -1;
                if (parseFloat(a.price.toString()) > parseFloat(b.price.toString())) return 1;
                return 0;
            });
            break;
        case 'Price, high to low':
            thirdFilter.sort((a, b) => {
                if (parseFloat(a.price.toString()) < parseFloat(b.price.toString())) return -1;
                if (parseFloat(a.price.toString()) > parseFloat(b.price.toString())) return 1;
                return 0;
            }).reverse();
            break;
    }

    res.render('plants', {title: 'Plants', first_name: req.session.first_name, search_result: thirdFilter, search_query: searchQuery, cart: req.session.cart});
});

app.post('/plants/add_to_cart', async (req, res) => {
    const { plant_id, amount, action } = req.body;

    if (amount == 0) // remove instead if amount is 0
        res.redirect(307, '/plants/remove_from_cart');
    else{
        let plant = await Plant.findOne({_id: plant_id});
        if (req.session.cart){
            if (plant_id in req.session.cart){
                if (action == 'rewrite')
                    req.session.cart[plant_id] = {plant: plant, amount: amount};
                else if (action =='add')
                    req.session.cart[plant_id].amount += amount;
            }
            else {
                req.session.cart[plant_id] = {plant: plant, amount: amount};
            }
        }
        else {
            req.session.cart = {};
            req.session.cart[plant_id] = {plant: plant, amount: amount};
        }

        // update user's cart in DB, if logged in
        if (req.session.isAuth){
            const authedUser = await User.findOne({_id: req.session.userID});
            authedUser.cart = JSON.stringify(req.session.cart);
            authedUser.save();
        }
        

        res.send(req.session.cart);
    }

    
});

app.post('/plants/remove_from_cart', async (req, res) => {
    const { plant_id } = req.body;
    delete req.session.cart[plant_id];

    // update user's cart in DB, if logged in
    if (req.session.isAuth){
        const authedUser = await User.findOne({_id: req.session.userID});
        authedUser.cart = JSON.stringify(req.session.cart);
        authedUser.save();
    }

    res.send(req.session.cart);
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
            req.session.first_name = existingUser.first_name;
            req.session.userID = existingUser._id;


            // handle guest cart and existing acocunt cart conflict on login
            if (!req.session.cart) // guest cart is undefined, make it an empty object instead to avoid errors
                req.session.cart = {};
            if (existingUser.cart){ // check if there's a cart saved in database
                let databaseCart = JSON.parse(existingUser.cart);
                let databaseCartKeys = Object.keys(databaseCart);
                if (databaseCartKeys.length != 0){ // check if that cart has at least 1 product inside; merge distinct products; and update similar products with higher product amount
                    databaseCartKeys.forEach(key => {
                        if (key in req.session.cart) // database cart item is also in guest cart; get highest product amount and update guest cart
                            req.session.cart[key].amount = Math.max(databaseCart[key].amount, req.session.cart[key].amount);
                        else // database cart item is not in guest cart; merge into guest cart
                            req.session.cart[key] = databaseCart[key];
                    });

                    // now save resulting cart to database
                    existingUser.cart = JSON.stringify(req.session.cart);
                    existingUser.save();
                } 
                else{ // no products inside database cart; save guest cart to database
                    existingUser.cart = JSON.stringify(req.session.cart);
                    existingUser.save();
                }
            }
            else{ // no cart saved in database; save guest cart to database
                existingUser.cart = JSON.stringify(req.session.cart);
                existingUser.save();
            }
            
            req.session.save(() => res.redirect('/account_profile'));
        }
    }
});

app.post('/logout', authedOnly, (req, res) => {
    req.flash('type', 'success');
    req.flash('message', 'Successfully logged out!');
    req.session.isAuth = false;
    delete req.session.first_name;
    delete req.session.userID;
    delete req.session.cart;
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


app.get('/account_profile', authedOnly, async (req, res) => {
    const flashType = req.flash('type');
    const flashMsg = req.flash('message');

    // populate forms with authenticated user's data; Data is retrieved using user's ID stored in session
    const authedUser = await User.findOne({_id: req.session.userID});
    
    res.render('account_profile', {
        title: 'Profile',
        first_name: req.session.first_name, 
        flashObj: { type: flashType, message: flashMsg },
        profileData: {
            profile: {
                firstName: authedUser.first_name,
                lastName: authedUser.last_name,
                email: authedUser.email
            },
            orders: {

            },
            delivery_address: authedUser.delivery_address ? JSON.parse(authedUser.delivery_address) : authedUser.delivery_address,
            billing_address: authedUser.billing_address ? JSON.parse(authedUser.billing_address) : authedUser.billing_address
        },
        cart: req.session.cart
    });
})

app.post('/account_profile/edit_profile', authedOnly, async (req, res) => {
    const { first_name, last_name, email } = req.body;

    User.findOneAndUpdate(
        { _id: req.session.userID }, 
        {
            first_name: first_name,
            last_name: last_name,
            email: email
        }, 
        (err, data) => {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({
                    type: 'error',
                    message: 'There was an error on updating the profile.'
                }));
            } else {
                console.log(data);
                req.session.first_name = first_name;
                res.send(JSON.stringify({
                    type: 'success',
                    message: 'Successfully updated profile!'
                }));
            }
        }
    );
});

app.post('/account_profile/edit_address', authedOnly, async (req, res) => {
    const {address_type, full_name, houseNo_Street_Building, brgy_province_region, zipcode, phoneNo } = req.body;
    const newAddress = JSON.stringify({
        full_name: full_name,
        houseNo_Street_Building: houseNo_Street_Building,
        brgy_province_region: brgy_province_region,
        zipcode: zipcode,
        phoneNo: phoneNo
    });

    let authedUser = await User.findOne({_id: req.session.userID});

    if (address_type == 'Delivery Address'){
        authedUser.delivery_address = newAddress;
        authedUser.save();
    }
    else if (address_type == 'Billing Address'){
        authedUser.billing_address = newAddress;
        authedUser.save();
    }

    res.send(req.body);
})

app.post('/account_profile/delete_address', authedOnly, async (req, res) => {
    const {address_type } = req.body;

    let authedUser = await User.findOne({_id: req.session.userID});

    if (address_type == 'Delivery Address'){
        authedUser.delivery_address = undefined;
        authedUser.save();
    }
    else if (address_type == 'Billing Address'){
        authedUser.billing_address = undefined;
        authedUser.save();
    }

    res.send(req.body);
});

app.post('/account_profile/change_password', authedOnly, async (req, res) => {
    const { current_password, new_password } = req.body;
    console.log("curr pass: " + current_password + " | New Pass:" + new_password);

    // check first if the same password
    let authedUser = await User.findOne({_id: req.session.userID});

    const isMatch = await bcrypt.compare(current_password, authedUser.password);
    if (isMatch){
        authedUser.password = await bcrypt.hash(new_password, 10);
        authedUser.save();
        res.send(JSON.stringify({
            type: 'success',
            message: 'Successfully updated profile!'
        }));
        // User.findOneAndUpdate(
        //     { password: hashed_current_password }, 
        //     { password: hashed_new_password }, 
        //     (err, data) => {
        //         if (err) {
        //             console.log(err);
                    
        //         } else {
        //             console.log(data);
        //             res.send(JSON.stringify({
        //                 type: 'success',
        //                 message: 'Successfully updated profile!'
        //             }));
        //         }
        //     }
        // );
    }
    else {
        res.send(JSON.stringify({
            type: 'error',
            message: 'Incorrect password.'
        }));
    }
});


app.get('/cart', authedOnly, async (req, res) => {
    // get 3 random products HAHAHA
    const plants = await Plant.find();
    const noOfPlantsToSuggest = 3;
    let suggestedPlants = [];
    let indices = [];
    if (noOfPlantsToSuggest < plants.length){
        while (indices.length != noOfPlantsToSuggest){
            let index = Math.floor(Math.random()*plants.length);
            if (!indices.includes(index)){
                indices.push(index);
                suggestedPlants.push(plants[index]);
            }
        }
    }
    else{
        suggestedPlants = plants;
    }

    

    res.render('cart', {title: 'Cart', first_name: req.session.first_name, cart: req.session.cart, suggested_plants: suggestedPlants} )
});


app.get('/checkout', authedOnly, async (req, res) => {
    const flashType = req.flash('type')
    const flashMsg = req.flash('message');

    const authedUser = await User.findOne({_id: req.session.userID});

    res.render('checkout', {
        title: 'Checkout',
        flashObj: {type: flashType, message: flashMsg},
        email: authedUser.email,
        delivery_address: authedUser.delivery_address ? JSON.parse(authedUser.delivery_address) : authedUser.delivery_address,
        billing_address: authedUser.billing_address ? JSON.parse(authedUser.billing_address) : authedUser.billing_address,
        cart: req.session.cart
    });
});

app.post('/checkout', authedOnly, async (req, res) => {
    const authedUser = await User.findOne({_id: req.session.userID});

    if (req.session.cart && Object.keys(req.session.cart).length != 0){
        if (authedUser.delivery_address && authedUser.billing_address){ // success checkout
            delete req.session.cart;
            authedUser.cart = undefined;
            authedUser.save();
            res.redirect('/order_complete');
        }
        else {
            req.flash('type', 'error');
            req.flash('message', 'Delivery/Billing Address is not yet set.');
            req.session.save(() => res.redirect('/checkout'));
        }
    }
    else {
        req.flash('type', 'error');
        req.flash('message', 'No items added to cart yet.');
        req.session.save(() => res.redirect('/checkout'));
        
    }
});

app.get('/order_complete', authedOnly, (req, res) => {
    res.render('order_complete', {title: 'Order Complete'});
});

// 404 page
app.use((req, res) => {
    res.render('error_page', { title: '404' });
});

