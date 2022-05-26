const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String
    },
    billing_address: {
        type: String
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;