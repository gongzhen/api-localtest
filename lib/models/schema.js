// consumer schema
const {Schema} = require('mongoose');

const schema = new Schema({
	name:String,
	email:String
});

exports.schema = schema;