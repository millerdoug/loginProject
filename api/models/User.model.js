const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Boolean, required: true, default: false},
    dateTime: {type: String, required: true, default: () => new Date().toDateString()}
}, {Timestamps: true});

module.exports = mongoose.model('User', userSchema);