const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    password: String,
    category: String
}, { timestamps: true });

module.exports = mongoose.model('product', userSchema, 'product');