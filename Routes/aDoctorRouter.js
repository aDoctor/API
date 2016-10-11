var express = require('express');

var routes = function (Book) {
    var aDoctorRouter = express.Router();
    aDoctorRouter.route('/')
    .post(function (req, res) {/*POST NEW ITEM*/
        var book = new Book(req.body);
        book.save(); /*{"title":"My New Book","genre":"Fiction","author":"Jon Mills"}*/
        console.log(book);
        res.status(201).send(book); /*201: means created*//*send back book as it contain the _id*/
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        //var query = req.query;
        var query = {};
        //localhost:8000/books?genre=Science%20Fiction
        if (req.query.genre)
            query.genre = req.query.genre;

        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);//send 500 with the error
                //console.log(err);
            }
            else {
                res.json(books);
                /*Add Links
                 var returnBooks = [];
                 books.forEach(function(element,index,array){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                 })
                  res.json(books);
                 * 
                 */
            }
        });
    });

    /*Middle Ware*/
    aDoctorRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId,function(err,book){
            if(err)
                res.status(500).send(err);

            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('no book found');
            }
        });    

        aDoctorRouter.route('/:bookId')
            .get(function (req, res) {
                res.json(req.book);
            })
            .put(function (req, res) {
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.book);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.book[p] = req.body[p];

                req.book.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.book);
                });
            }).delete(function (req, res) {
                req.book.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return aDoctorRouter;
    });
    
    //aDoctorRouter.route('/Book/:bookId')
    //    .get(function (req, res) {/*PULL INDIVIDUL ITEMS BASED ON ID*/
    //        Book.findById(req.params.bookId, function (err, book) {
    //            if (err)
    //                res.status(500).send(err);
    //            else
    //                res.json(book);
    //        });
    //    }).put(function (req, res) {/*UPDATe replace Item*/
    //        Book.findById(req.params.bookId, function (err, book) {
    //            if (err)
    //                res.status(500).send(err);
    //            else
    //            {
    //                book.title = req.body.title;
    //                book.author = req.body.author;
    //                book.genre = req.body.genre;
    //                book.read = req.body.read;
    //                book.save();
    //                res.json(book);
    //            }
    //        }).patch(function (req, res) {/*UPDATe replace Item*/
    //            Book.findById(req.params.bookId, function (err, book) {
    //                if (err)
    //                    res.status(500).send(err);
    //                else
    //                {
    //                    book.title = req.body.title;
    //                    book.author = req.body.author;
    //                    book.genre = req.body.genre;
    //                    book.read = req.body.read;
    //                    book.save();
    //                    res.json(book);
    //                }
    //            });

    //    });
    return aDoctorRouter;
};

module.exports = routes;