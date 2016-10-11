var express = require('express');

var routes = function (Specialty) {
    var specialtyRouter = express.Router();
    specialtyRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var specialty = new Specialty(req.body);
        specialty.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(specialty);
        res.status(201).send(specialty);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Specialty.find(query, { passwordSalt: 0, password: 0 }, function (err, books) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(books);
            }
        });
    });

    /*Middle Ware*/
    specialtyRouter.use('/:specialtyId', function (req, res, next) {
        Specialty.findById(req.params.specialtyId, function (err, specialty) {
            if(err)
                res.status(500).send(err);

            else if (specialty)
            {
                req.specialty = specialty;
                next();
            }
            else
            {
                res.status(404).send('specialty found');
            }
        });    

        specialtyRouter.route('/:specialtyId')
            .get(function (req, res) {
                res.json(req.specialty);
            })
            .put(function (req, res) {
                console.log(req.specialty);
                req.specialty.name = req.body.name;
                req.specialty.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.specialty);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.specialty[p] = req.body[p];

                req.specialty.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.specialty);
                });
            }).delete(function (req, res) {
                req.specialty.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return specialtyRouter;
    });
    
    
    return specialtyRouter;
};

module.exports = routes;