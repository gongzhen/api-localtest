const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConsumerSchema = new Schema({
	name:String,
	email:String
});

module.exports = mongoose.model('consumers', ConsumerSchema);