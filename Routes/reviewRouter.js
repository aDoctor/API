var express = require('express');

var routes = function (Review) {
    var reviewRouter = express.Router();
    reviewRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var review = new Review(req.body);
        review.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(review);
        res.status(201).send(review);
        /*201: means created*/
        /*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Review.find(query, { passwordSalt: 0, password: 0 }, function (err, books) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(books);
            }
        });
    });

    /*Middle Ware*/
    reviewRouter.use('/:reviewId', function (req, res, next) {
        Review.findById(req.params.reviewId, { passwordSalt: 0, password: 0 }, function (err, review) {
            if(err)
                res.status(500).send(err);

            else if (review)
            {
                req.review = review;
                next();
            }
            else
            {
                res.status(404).send('review found');
            }
        });    

        reviewRouter.route('/:reviewId')
            .get(function (req, res) {
                res.json(req.review);
            })
            .put(function (req, res) {
                req.review._userID = req.body._userID;
                req.review._doctorID = req.body._doctorID;
                req.review.date = req.body.date;
                req.review.stars = req.body.stars;
                req.review.comment = req.body.comment;
                req.review.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.review);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.review[p] = req.body[p];

                req.review.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.review);
                });
            }).delete(function (req, res) {
                req.review.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return reviewRouter;
    });
    
    
    return reviewRouter;
};

module.exports = routes;