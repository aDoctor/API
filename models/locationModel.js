var mongoose = require('mongoose'), Schema = mongoose.Schema;

var locationModel = new Schema({
    title: String,
    lat: Number,
    lng: Number,
    address: String,
    city: String,
    _stateID: { type: Schema.Types.ObjectId, ref: 'State' },
    _countryID: { type: Schema.Types.ObjectId, ref: 'Country' },
});
module.exports = mongoose.model('Location', locationModel);