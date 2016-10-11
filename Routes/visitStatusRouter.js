var express = require('express');

var routes = function (VisitStatus) {
    var visitStatusRouter = express.Router();
    visitStatusRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var visitStatus = new VisitStatus(req.body);
        visitStatus.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(visitStatus);
        res.status(201).send(visitStatus);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        VisitStatus.find(query, function (err, visitStatuss)     {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(visitStatuss);
            }
        });
    });

    /*Middle Ware*/
    visitStatusRouter.use('/:visitStatusId', function (req, res, next) {
        VisitStatus.findById(req.params.visitStatusId, { passwordSalt: 0, password: 0 }, function (err, visitStatus) {
            if(err)
                res.status(500).send(err);

            else if (visitStatus)
            {
                req.visitStatus = visitStatus;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        visitStatusRouter.route('/:visitStatusId')
            .get(function (req, res) {
                res.json(req.visitStatus);
            })
            .put(function (req, res) {
                req.visitStatus.name = req.body.name;
                req.visitStatus.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.visitStatus);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.visitStatus[p] = req.body[p];

                req.visitStatus.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.visitStatus);
                });
            }).delete(function (req, res) {
                req.visitStatus.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return visitStatusRouter;
    });
    
    
    return visitStatusRouter;
};

module.exports = routes;