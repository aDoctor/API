var express = require('express');

var routes = function (InsurancePlan) {
    var insurancePlanRouter = express.Router();
    insurancePlanRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var insurancePlan = new InsurancePlan(req.body);
        insurancePlan.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(insurancePlan);
        res.status(201).send(insurancePlan);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        InsurancePlan.find(query, function (err, insurancePlans)     {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(insurancePlans);
            }
        });
    });

    /*Middle Ware*/
    insurancePlanRouter.use('/:insurancePlanId', function (req, res, next) {
        InsurancePlan.findById(req.params.insurancePlanId, { passwordSalt: 0, password: 0 }, function (err, insurancePlan) {
            if(err)
                res.status(500).send(err);

            else if (insurancePlan)
            {
                req.insurancePlan = insurancePlan;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        insurancePlanRouter.route('/:insurancePlanId')
            .get(function (req, res) {
                res.json(req.insurancePlan);
            })
            .put(function (req, res) {
                req.insurancePlan._providerID = req.body._doctorID;
                req.insurancePlan.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.insurancePlan);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.insurancePlan[p] = req.body[p];

                req.insurancePlan.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.insurancePlan);
                });
            }).delete(function (req, res) {
                req.insurancePlan.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return insurancePlanRouter;
    });
    
    
    return insurancePlanRouter;
};

module.exports = routes;