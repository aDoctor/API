var mongoose = require('mongoose'), Schema = mongoose.Schema;

var visitTypeModel = new Schema({
    name: String,
    _doctorID: { type: Schema.Types.ObjectId, ref: 'Doctor' },
});
module.exports = mongoose.model('VisitType', visitTypeModel);
