var mongoose = require('mongoose'), Schema = mongoose.Schema;

var calendarDoctorModel = new Schema({
    _doctorID: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    _calendarID: { type: Schema.Types.ObjectId, ref: 'Calendar' }
});
module.exports = mongoose.model('CalendarDoctor', calendarDoctorModel);
