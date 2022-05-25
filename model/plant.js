const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    plant_name: {
        type: String,
        required: true
    },
    plant_type: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    image_path: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;