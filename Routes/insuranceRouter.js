var express = require('express');

var routes = function (Insurance) {
    var insuranceRouter = express.Router();
    insuranceRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var insurance = new Insurance(req.body);
        insurance.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(insurance);
        res.status(201).send(insurance);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Insurance.find(query, function (err, insurances)     {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(insurances);
            }
        });
    });

    /*Middle Ware*/
    insuranceRouter.use('/:insuranceId', function (req, res, next) {
        Insurance.findById(req.params.insuranceId, { passwordSalt: 0, password: 0 }, function (err, insurance) {
            if(err)
                res.status(500).send(err);

            else if (insurance)
            {
                req.insurance = insurance;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        insuranceRouter.route('/:insuranceId')
            .get(function (req, res) {
                res.json(req.insurance);
            })
            .put(function (req, res) {
                req.insurance._insurancePlanID = req.body._insurancePlanID;
                req.insurance._clinicID = req.body._clinicID;
                req.insurance.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.insurance);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.insurance[p] = req.body[p];

                req.insurance.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.insurance);
                });
            }).delete(function (req, res) {
                req.insurance.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return insuranceRouter;
    });
    
    
    return insuranceRouter;
};

module.exports = routes;