var express = require('express');

var routes = function (CalendarDoctor) {
    var calendarDoctorRouter = express.Router();
    calendarDoctorRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var calendarDoctor = new CalendarDoctor(req.body);
        calendarDoctor.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(calendarDoctor);
        res.status(201).send(calendarDoctor);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        CalendarDoctor.find(query, function (err, calendarDoctors)     {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(calendarDoctors);
            }
        });
    });

    /*Middle Ware*/
    calendarDoctorRouter.use('/:calendarDoctorId', function (req, res, next) {
        CalendarDoctor.findById(req.params.calendarDoctorId, { passwordSalt: 0, password: 0 }, function (err, calendarDoctor) {
            if(err)
                res.status(500).send(err);

            else if (calendarDoctor)
            {
                req.calendarDoctor = calendarDoctor;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        calendarDoctorRouter.route('/:calendarDoctorId')
            .get(function (req, res) {
                res.json(req.calendarDoctor);
            })
            .put(function (req, res) {
                req.calendarDoctor._doctorID = req.body._doctorID;
                req.calendarDoctor._calendarID = req.body._calendarID;
                req.calendarDoctor.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.calendarDoctor);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.calendarDoctor[p] = req.body[p];

                req.calendarDoctor.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.calendarDoctor);
                });
            }).delete(function (req, res) {
                req.calendarDoctor.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return calendarDoctorRouter;
    });
    
    
    return calendarDoctorRouter;
};

module.exports = routes;