var mongoose = require('mongoose'), Schema = mongoose.Schema;

var insuranceModel = new Schema({
    _insurancePlanID: { type: Schema.Types.ObjectId, ref: 'InsurancePlan' },
    _clinicID: { type: Schema.Types.ObjectId, ref: 'Clinic' }
});
module.exports = mongoose.model('Insurance', insuranceModel);
