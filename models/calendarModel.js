var mongoose = require('mongoose'), Schema = mongoose.Schema;

var calendarModel = new Schema({
    _clinicID: { type: Schema.Types.ObjectId, ref: 'Clinic' },
    _userID: { type: Schema.Types.ObjectId, ref: 'User' },
    start: Date,
    end: Date,
    timePeriod: Number,
    createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calendar', calendarModel);
