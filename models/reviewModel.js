var mongoose = require('mongoose'), Schema = mongoose.Schema;

var reviewModel = new Schema({
    _userID: { type: Schema.Types.ObjectId, ref: 'User' },
    _doctorID: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    date: Date,
    stars: Number,
	comment:String
});
module.exports = mongoose.model('Review', reviewModel);
