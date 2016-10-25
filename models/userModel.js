var mongoose = require('mongoose'), Schema = mongoose.Schema;

var userModel = new Schema({
    MRN:String,
    firstName: String,
    lastName: String,
    email: String,	
    phoneNumber: String,
    password: String,
    passwordSalt: String,
    birthdate: Date,
    gender: { type: Boolean, default: false },
    _insurancePlanID:String
});
module.exports = mongoose.model('User', userModel);
