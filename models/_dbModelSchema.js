var mongoose = require('mongoose'), Schema = mongoose.Schema;

/*var bookModel = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: {type:Boolean , default:false}
});
*/

var bookModel = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookModel); //load it on mangoo new schema called book*/
/*
var calendarModel = new Schema({
	_clinicID: {type: Schema.Types.ObjectId, ref: 'Clinic' },
	start: Date,
	end: Date,
	TimePeriod:Number,
	CreateDate:{ type: Date, default: Date.now }	
});

module.exports = mongoose.model('Calendar', calendarModel);

var calendarDoctorModel = new Schema({
	_doctorID: {type: Schema.Types.ObjectId, ref: 'Doctor' },
	_calendarID: {type: Schema.Types.ObjectId, ref: 'Calendar' }	
});
module.exports = mongoose.model('CalendarDoctor', calendarDoctorModel);

var clinicModel = new Schema({
	_doctorID: {type: Schema.Types.ObjectId, ref: 'Doctor' },
	_locationID: {type: Schema.Types.ObjectId, ref: 'Location' },
});
module.exports = mongoose.model('Clinic', clinicModel);

var countryModel = new Schema({    
    Name: String
});
module.exports = mongoose.model('Country', countryModel);

var doctorModel = new Schema({
    _userID: {type: Schema.Types.ObjectId, ref: 'User' },
    _specialtyID: { type: Schema.Types.ObjectId, ref: 'Specialty' },
    MRN:String,
    LicenseNumber:String
});
module.exports = mongoose.model('Doctor', doctorModel);

var insuranceModel = new Schema({
    _insurancePlanID: { type: Schema.Types.ObjectId, ref: 'InsurancePlan' },
    _clinicID: { type: Schema.Types.ObjectId, ref: 'Clinic' }	
});
module.exports = mongoose.model('Insurance', insuranceModel);

var insurancePlanModel = new Schema({
    _providerID: { type: Schema.Types.ObjectId, ref: 'Provider' },
    Name: String	
});
module.exports = mongoose.model('InsurancePlan', insurancePlanModel);

var insuranceProviderModel = new Schema({
    Name: String
});
module.exports = mongoose.model('InsuranceProvider', insuranceProviderModel);

var locationModel = new Schema({ 
Title: String,
lat:Number,
lng:Number,
Address: String,
City: String,
_stateID: { type: Schema.Types.ObjectId, ref: 'State' },	
_countryID: { type: Schema.Types.ObjectId, ref: 'Country' },
});
module.exports = mongoose.model('Location', locationModel);


var specialtyModel = new Schema({
    Name: String
});
module.exports = mongoose.model('Specialty', specialtyModel);

var userModel = new Schema({
    Name: String,
    Email: String,
    PhoneNumber: String,
    Password: String,
    PasswordSalt: String,
    Birthdate: Date,
    Gender: { type: Boolean, default: false }
});
module.exports = mongoose.model('User', userModel);

var visitModel = new Schema({   
    _userID: { type: Schema.Types.ObjectId, ref: 'User' },
    _clinicID: { type: Schema.Types.ObjectId, ref: 'Clinic' },
    Date: Date,
    _visitStatusID: { type: Schema.Types.ObjectId, ref: 'VisitStatus' },
    _visitTypeID: { type: Schema.Types.ObjectId, ref: 'VisitType' }
});
module.exports = mongoose.model('Visit', visitModel);


var stateModel = new Schema({
    Name: String
});
module.exports = mongoose.model('State', stateModel);


var visitStatusModel = new Schema({
    Name: String
});
module.exports = mongoose.model('VisitStatus', visitStatusModel);

var visitTypeModel = new Schema({
    Name: String
});
module.exports = mongoose.model('VisitType', visitTypeModel);

*/

