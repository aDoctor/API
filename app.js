var express = require('express'),
    mangoose = require('mongoose')/*like entity framework npm install mongoose --save  */,
    bodyParser = require('body-parser'); /*npm install body-parser --save*/ /*TO ADD POST*/
    
var db = mangoose.connect('mongodb://test:test1234@ds021356.mlab.com:21356/adoctor');//open connection to database

//models(model for mongodb
var Book = require('./models/bookModel');//Book
var User = require('./models/userModel');//User
var Calendar = require('./models/calendarModel');//Calendar

var Specialty = require('./models/specialtyModel');//Specialty
var Doctor = require('./models/doctorModel');//Doctor
var Clinic = require('./models/clinicModel');//Clinic

var Country = require('./models/countryModel');//Country
var State = require('./models/stateModel');//State
var Location = require('./models/locationModel');//Location
var CalendarDoctor = require('./models/calendarDoctorModel');//CalendarDoctor
var Insurance = require('./models/insuranceModel');//Insurance
var InsurancePlan = require('./models/insurancePlanModel');//InsurancePlan
var InsuranceProvider = require('./models/insuranceProviderModel');//InsuranceProvider
var Visit = require('./models/visitModel');//Visit
var VisitStatus = require('./models/visitStatusModel');//VisitStatus
/*


var VisitType = require('./models/visitTypeModel');//State
*/

var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true })); //TO ADD POST
app.use(bodyParser.json()); //TO ADD POST

//setup some routes to know how the API will work
//var aDoctorRouter = express.Router();
var aDoctorRouter = require('./Routes/aDoctorRouter')(Book);

/*aDoctorRouter.route('/Books')
    .get(function (req, res) {
        var responseJson = { hello: "This is my Api" };
        res.json(responseJson); 
    });*/

var userRouter = require('./Routes/userRouter')(User);
var calendarRouter = require('./Routes/calendarRouter')(Calendar);
var dateRouter = require('./Routes/dateRouter')(Calendar);
var specialtyRouter = require('./Routes/specialtyRouter')(Specialty);

var countryRouter = require('./Routes/countryRouter')(Country);
var stateRouter = require('./Routes/stateRouter')(State);

var doctorRouter = require('./Routes/doctorRouter')(Doctor);
var clinicRouter = require('./Routes/clinicRouter')(Clinic);
var locationRouter = require('./Routes/locationRouter')(Location);

var calendarDoctorRouter = require('./Routes/calendarDoctorRouter')(CalendarDoctor);
var insuranceDoctorRouter = require('./Routes/insuranceRouter')(Insurance);
var insurancePlanDoctorRouter = require('./Routes/insurancePlanRouter')(InsurancePlan);
var insuranceProviderRouter = require('./Routes/insuranceProviderRouter')(InsuranceProvider);
var visitRouter = require('./Routes/visitRouter')(Visit);
var visitStatusRouter = require('./Routes/visitStatusRouter')(VisitStatus);



app.use('/api/books', aDoctorRouter);
app.use('/api/user', userRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/specialty', specialtyRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/clinic', clinicRouter);
app.use('/api/location', locationRouter);
app.use('/api/country', countryRouter);
app.use('/api/state', stateRouter);
//---
app.use('/api/date', dateRouter);
//---
app.use('/api/calendarDoctor', calendarDoctorRouter);
app.use('/api/insuranceDoctor', insuranceDoctorRouter);
app.use('/api/insurancePlanDoctor', insurancePlanDoctorRouter);
app.use('/api/insuranceProvider', insuranceProviderRouter);
app.use('/api/visitRouter', visitRouter);
app.use('/api/visitStatusRouter', visitStatusRouter);

app.get('/', function (req, res) {
    res.send('Welcome');//send:return back text
});
app.listen(port, function () { console.log('Running on PORT:' + port); });