const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    phone: Number
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema, 'user');
//mongoose(model_name, Schema, collection_name)