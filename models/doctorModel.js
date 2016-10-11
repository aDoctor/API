var mongoose = require('mongoose'), Schema = mongoose.Schema;

var doctorModel = new Schema({
    _userID: { type: Schema.Types.ObjectId, ref: 'User' },
    _specialtyID: { type: Schema.Types.ObjectId, ref: 'Specialty' },
    mrn: String,
    licenseNumber: String
});
module.exports = mongoose.model('Doctor', doctorModel);