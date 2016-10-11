var mongoose = require('mongoose'), Schema = mongoose.Schema;
var insuranceProviderModel = new Schema({
    name: String
});
module.exports = mongoose.model('InsuranceProvider', insuranceProviderModel);
