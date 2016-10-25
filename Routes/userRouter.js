var express = require('express');

var routes = function (User) {
    var userRouter = express.Router();
    userRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var user = new User(req.body);
        user.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(user);
        res.status(201).send(user);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        User.find(query, { passwordSalt: 0, password: 0 }, function (err, books) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(books);
            }
        });
    });

    /*Middle Ware*/
    userRouter.use('/:userId', function (req, res, next) {
        User.findById(req.params.userId, { passwordSalt: 0, password: 0 }, function (err, user) {
            if(err)
                res.status(500).send(err);

            else if (user)
            {
                req.user = user;
                next();
            }
            else
            {
                res.status(404).send('user found');
            }
        });    

        userRouter.route('/:userId')
            .get(function (req, res) {
                res.json(req.user);
            })
            .put(function (req, res) {
                req.user.MRN = req.body.MRN;
                req.user.firstName = req.body.firstName;
                req.user.lastName = req.body.lastName;
                req.user.email = req.body.email;
                req.user.phoneNumber = req.body.phoneNumber;
                req.user.password = req.body.password;
                req.user.passwordSalt = req.body.passwordSalt;
                req.user.birthdate = req.body.birthdate;
                req.user.gender = req.body.gender;
                req.user._insurancePlanID = req.body._insurancePlanID;
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
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return userRouter;
    });
    
    
    return userRouter;
};

module.exports = routes;