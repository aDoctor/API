var express = require('express');

var routes = function (InsuranceProvider) {
    var insuranceProviderRouter = express.Router();
    insuranceProviderRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var insuranceProvider = new InsuranceProvider(req.body);
        insuranceProvider.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(insuranceProvider);
        res.status(201).send(insuranceProvider);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        InsuranceProvider.find(query, function (err, insuranceProviders)     {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(insuranceProviders);
            }
        });
    });

    /*Middle Ware*/
    insuranceProviderRouter.use('/:insuranceProviderId', function (req, res, next) {
        InsuranceProvider.findById(req.params.insuranceProviderId, { passwordSalt: 0, password: 0 }, function (err, insuranceProvider) {
            if(err)
                res.status(500).send(err);

            else if (insuranceProvider)
            {
                req.insuranceProvider = insuranceProvider;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        insuranceProviderRouter.route('/:insuranceProviderId')
            .get(function (req, res) {
                res.json(req.insuranceProvider);
            })
            .put(function (req, res) {
                req.insuranceProvider.name = req.body.name;
                req.insuranceProvider.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.insuranceProvider);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.insuranceProvider[p] = req.body[p];

                req.insuranceProvider.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.insuranceProvider);
                });
            }).delete(function (req, res) {
                req.insuranceProvider.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return insuranceProviderRouter;
    });
    
    
    return insuranceProviderRouter;
};

module.exports = routes;