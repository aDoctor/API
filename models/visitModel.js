var mongoose = require('mongoose'), Schema = mongoose.Schema;

var visitModel = new Schema({
    _userID: { type: Schema.Types.ObjectId, ref: 'User' },
    _clinicID: { type: Schema.Types.ObjectId, ref: 'Clinic' },
    date: Date,
    _visitStatusID: { type: Schema.Types.ObjectId, ref: 'VisitStatus' },
    _visitTypeID: { type: Schema.Types.ObjectId, ref: 'VisitType' }
});
module.exports = mongoose.model('Visit', visitModel);
