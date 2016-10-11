var mongoose = require('mongoose'), Schema = mongoose.Schema;

var specialtyModel = new Schema({
    name: String
});
module.exports = mongoose.model('Specialty', specialtyModel);
