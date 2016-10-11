var express = require('express');

var routes = function (Country) {
    var countryRouter = express.Router();
    countryRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var country = new Country(req.body);
        country.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(country);
        res.status(201).send(country);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Country.find(query, { passwordSalt: 0, password: 0 }, function (err, countrys) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(countrys);
            }
        });
    });

    /*Middle Ware*/
    countryRouter.use('/:countryId', function (req, res, next) {
        Country.findById(req.params.countryId, { passwordSalt: 0, password: 0 }, function (err, user) {
            if(err)
                res.status(500).send(err);

            else if (user)
            {
                req.country = user;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        countryRouter.route('/:countryId')
            .get(function (req, res) {
                res.json(req.country);
            })
            .put(function (req, res) {
                req.country.name = req.body.name;
                req.country.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.country);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.country[p] = req.body[p];

                req.country.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.country);
                });
            }).delete(function (req, res) {
                req.country.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return countryRouter;
    });
    
    
    return countryRouter;
};

module.exports = routes;