var express = require('express');

var routes = function (State) {
    var stateRouter = express.Router();
    stateRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var state = new State(req.body);
        state.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(state);
        res.status(201).send(state);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        State.find(query, { passwordSalt: 0, password: 0 }, function (err, states) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(states);
            }
        });
    });

    /*Middle Ware*/
    stateRouter.use('/:stateId', function (req, res, next) {
        State.findById(req.params.stateId, { passwordSalt: 0, password: 0 }, function (err, user) {
            if (err)
                res.status(500).send(err);

            else if (user) {
                req.state = user;
                next();
            }
            else {
                res.status(404).send('user found');
            }
        });

        stateRouter.route('/:stateId')
            .get(function (req, res) {
                res.json(req.state);
            })
            .put(function (req, res) {
                req.state.name = req.body.name;
                req.state.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.state);
                });
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.state[p] = req.body[p];

                req.state.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.state);
                });
            }).delete(function (req, res) {
                req.state.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return stateRouter;
    });


    return stateRouter;
};

module.exports = routes;