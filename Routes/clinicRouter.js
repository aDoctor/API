var express = require('express');

var routes = function (Clinic) {
    var calendarRouter = express.Router();
    calendarRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var clinic = new Clinic(req.body);
        clinic.save();
        console.log(clinic);
        res.status(201).send(clinic); /*201: means created*//*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Clinic.find(query, function (err, clinic) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(clinic);
            }
        });
    });

    /*Middle Ware*/
    calendarRouter.use('/:clinicId', function (req, res, next) {
        Clinic.findById(req.params.clinicId, function (err, clinic) {
            if(err)
                res.status(500).send(err);

            else if (clinic)
            {
                req.clinic = clinic;
                next();
            }
            else
            {
                res.status(404).send('clinic not found');
            }
        });    

        calendarRouter.route('/:clinicId')
            .get(function (req, res) {
                res.json(req.clinic);
            })
            .put(function (req, res) {
                req.clinic._doctorID = req.body._doctorID;
                req.clinic._locationID = req.body._locationID;
                req.clinic.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.clinic);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.clinic[p] = req.body[p];

                req.clinic.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.clinic);
                });
            }).delete(function (req, res) {
                req.clinic.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return calendarRouter;
    });
    
    
    return calendarRouter;
};

module.exports = routes;