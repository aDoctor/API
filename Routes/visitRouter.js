var express = require('express');

var routes = function (Visit) {
    var visitRouter = express.Router();
    visitRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var visit = new Visit(req.body);
        visit.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(visit);
        res.status(201).send(visit);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Visit.find(query, function (err, visits)     {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(visits);
            }
        });
    });

    /*Middle Ware*/
    visitRouter.use('/:visitId', function (req, res, next) {
        Visit.findById(req.params.visitId, { passwordSalt: 0, password: 0 }, function (err, visit) {
            if(err)
                res.status(500).send(err);

            else if (visit)
            {
                req.visit = visit;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        visitRouter.route('/:visitId')
            .get(function (req, res) {
                res.json(req.visit);
            })
            .put(function (req, res) {
                req.visit._userID = req.body._userID;
                req.visit._clinicID = req.body._clinicID;
                req.visit.date = req.body.date;
                req.visit._visitStatusID = req.body._visitStatusID;
                req.visit._visitTypeID = req.body._visitTypeID;
                req.visit.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.visit);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.visit[p] = req.body[p];

                req.visit.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.visit);
                });
            }).delete(function (req, res) {
                req.visit.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return visitRouter;
    });
    
    
    return visitRouter;
};

module.exports = routes;