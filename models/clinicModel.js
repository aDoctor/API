var mongoose = require('mongoose'), Schema = mongoose.Schema;

var clinicModel = new Schema({
    _doctorID: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    _locationID: { type: Schema.Types.ObjectId, ref: 'Location' },
});
module.exports = mongoose.model('Clinic', clinicModel);
