var express = require('express');

var routes = function (Calendar) {
    var calendarRouter = express.Router();
    calendarRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var calendar = new Calendar(req.body);
        calendar.save();
        console.log(calendar);
        res.status(201).send(calendar); /*201: means created*//*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Calendar.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(books);
            }
        });
    });

    /*Middle Ware*/
    calendarRouter.use('/:userId', function (req, res, next) {
        Calendar.findById(req.params.userId, function (err, user) {
            if(err)
                res.status(500).send(err);

            else if (user)
            {
                req.user = user;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        calendarRouter.route('/:userId')
            .get(function (req, res) {
                res.json(req.user);
            })
            .put(function (req, res) {
                req.user._clinicID = req.body._clinicID;
                req.user.start = req.body.start;
                req.user.end = req.body.end;
                req.user.TimePeriod = req.body.TimePeriod;
                req.user.CreateDate = req.body.CreateDate;
                req.user.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.user);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.user[p] = req.body[p];

                req.user.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.user);
                });
            }).delete(function (req, res) {
                req.user.remove(function (err) {
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