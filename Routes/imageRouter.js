var express = require('express');
var fs = require('fs');

var multer = require('multer');	
var upload = multer({ dest: '/tmp' });

var routes = function (Image) {
    var imageRouter = express.Router();
    imageRouter.route('/')
    .post(upload.single('file') , function (req, res) {/*POST NEW ITEM*/
		console.log(req.body.filename);
		//http://stackoverflow.com/questions/36477145/how-to-upload-image-file-and-display-using-express-nodejs
		/*var file = __dirname + '/' + req.file.filename;
		  fs.rename(req.file.path, file, function(err) {
			if (err) {
			  console.log(err);
			  res.send(500);
			} else {
			  res.json({
				message: 'File uploaded successfully',
				filename: req.file.filename
			  });
			}
		  });*/
   
		
		
       /* var image = new Image(req.body);
        image.save();
        console.log(image);
        res.status(201).send(image);*/ /*201: means created*//*send back book as it contain the _id*/
		
		 /*var data = {
			file: req.body.fileData,
			mime: req.body.mime,
			name: req.body.name
		}*/
		 //console.log(req.body);
    	//res.status(201).send(req);
    })
    .get(function (req, res) {/*GET LIST OF ITEMS*/
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Image.find(query, function (err, image)	 {
            if (err) {
                res.status(500).send(err);//send 500 with the error
            }
            else {
                res.json(image);
            }
        });
    });

    /*Middle Ware*/
    imageRouter.use('/:imageId', function (req, res, next) {
        Image.findById(req.params.imageId, function (err, image) {
            if(err)
                res.status(500).send(err);

            else if (image)
            {
                req.image = image;
                next();
            }
            else
            {
                res.status(404).send('image not found');
            }
        });    

        imageRouter.route('/:imageId')
            .get(function (req, res) {
                res.json(req.image);
            })
            .put(function (req, res) {
                req.image.img = req.body._doctorID;
                req.image.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.image);
                }   );
            })
            .patch(function (req, res) {
                if (req.body._id)
                    delete req.body._id;

                for (var p in req.body)
                    req.image[p] = req.body[p];

                req.image.save(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.json(req.image);
                });
            }).delete(function (req, res) {
                req.image.remove(function (err) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(204).send('Removed');/*no content - doesnt exist*/
                });
            });

        return imageRouter;
    });
    
    
    return imageRouter;
};

module.exports = routes;