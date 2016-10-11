var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userModel = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    passwordSalt: String,
    birthdate: Date,
    gender: { type: Boolean, default: false }
});
module.exports = mongoose.model('User', userModel);
