var mongoose = require('mongoose'), Schema = mongoose.Schema;

var stateModel = new Schema({
    name: String
});
module.exports = mongoose.model('State', stateModel);
