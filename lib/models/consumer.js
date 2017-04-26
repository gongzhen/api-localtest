const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConsumerSchema = new Schema({
	name:String,
	quote:String
});

module.exports = mongoose.model('consumers', ConsumerSchema);