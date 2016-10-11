var mongoose = require('mongoose'), Schema = mongoose.Schema;

var insurancePlanModel = new Schema({
    _providerID: { type: Schema.Types.ObjectId, ref: 'Provider' },
    name: String
});
module.exports = mongoose.model('InsurancePlan', insurancePlanModel);
