var express = require('express');

var routes = function (Calendar) {
    var calendarRouter = express.Router();
    //http://localhost:8000/api/date   (all dates)
    calendarRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var book = new Calendar(req.body);
        book.save(); 
        console.log(book);
        res.status(201).send(book); /*201: means created*//*send back book as it contain the _id*/
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
    //http://localhost:8000/api/date/2015-12-11/2015-12-13   (fromDate-ToDate)
    calendarRouter.use('/:fromDate/:toDate', function (req, res, next) {
        console.error(req.params.fromDate);
        Calendar.find({start:{$gte:req.params.fromDate,$lte:req.params.toDate}},function (err, date) {          

            if(err)
                res.status(500).send(err);

            else if (date)
            {
                req.date = date;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        calendarRouter.route('/:fromDate/:toDate')
            .get(function (req, res) {
                res.json(req.date);
            });
            /*
            .put(function (req, res) {
                req.user._clinicID = res.body._clinicID;
                req.user.start = res.body.start;
                req.user.end = res.body.end;
                req.user.TimePeriod = res.body.TimePeriod;
                req.user.CreateDate = res.body.CreateDate;
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
                        res.status(204).send('Removed');
                });
            });*/

        return calendarRouter;
    });
    
    
    return calendarRouter;
};

module.exports = routes;