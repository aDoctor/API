var mongoose = require('mongoose'), Schema = mongoose.Schema;

var imageModel = new Schema({
     img: { data: Buffer, contentType: String }
});
module.exports = mongoose.model('Image', imageModel);
