var mongoose = require('mongoose'), Schema = mongoose.Schema;

var countryModel = new Schema({
    name: String
});
module.exports = mongoose.model('Country', countryModel);