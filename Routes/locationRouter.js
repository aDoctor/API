var express = require('express');

var routes = function (Location) {
    var locationRouter = express.Router();
    locationRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var location = new Location(req.body);
        location.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(location);
        res.status(201).send(location);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Location.find(query, { passwordSalt: 0, password: 0 }, function (err, locations) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(locations);
            }
        });
    });

    /*Middle Ware*/
    locationRouter.use('/:locationId', function (req, res, next) {
        Location.findById(req.params.specialtyId, function (err, location) {
            if(err)
                res.status(500).send(err);

            else if (location)
            {
                req.location = location;
                next();
            }
            else
            {
                res.status(404).send('location not found');
            }
        });    

        locationRouter.route('/:locationId')
            .get(function (req, res) {
                res.json(req.location);
            })
            .put(function (req, res) {
                console.log(req.location);
                req.location.title = req.body.title;
                req.location.lat = req.body.lat;
                req.location.lng = req.body.lng;
                req.location.address = req.body.address;
                req.location.city = req.body.city;
                req.location._stateID = req.body._stateID;
                req.location._countryID = req.body._countryID;

                req.location.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.location);
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

        return locationRouter;
    });
    
    
    return locationRouter;
};

module.exports = routes;