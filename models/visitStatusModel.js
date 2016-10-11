var mongoose = require('mongoose'), Schema = mongoose.Schema;

var visitStatusModel = new Schema({
    name: String
});
module.exports = mongoose.model('VisitStatus', visitStatusModel);
