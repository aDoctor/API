var express = require('express');
/*_userID: { type: Schema.Types.ObjectId, ref: 'User' },
_specialtyID: { type: Schema.Types.ObjectId, ref: 'Specialty' },
MRN: String,
    LicenseNumber: String*/

var routes = function (Doctor) {
    var doctorRouter = express.Router();
    doctorRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var doctor = new Doctor(req.body);
        doctor.save();
        console.log(doctor);
        res.status(201).send(doctor); /*201: means created*//*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Doctor.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(books);
            }
        });
    });

    /*Middle Ware*/
    doctorRouter.use('/:doctorId', function (req, res, next) {
        Doctor.findById(req.params.doctorId, function (err, doctor) {
            if(err)
                res.status(500).send(err);

            else if (doctor)
            {
                req.doctor = doctor;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        doctorRouter.route('/:doctorId')
            .get(function (req, res) {
                res.json(req.doctor);
            })
            .put(function (req, res) {
                req.doctor._userID = req.body._userID;
                req.doctor._specialtyID = req.body._specialtyID;
                req.doctor.mrn = req.body.mrn;
                req.doctor.licenseNumber = req.body.licenseNumber;
                req.doctor.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.doctor);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.doctor[p] = req.body[p];

                req.doctor.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.doctor);
                });
            }).delete(function (req, res) {
                req.doctor.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return doctorRouter;
    });
    
    
    return doctorRouter;
};

module.exports = routes;