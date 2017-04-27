// require schema from ./schema
// export mongoose with schema

const mongoose = require('mongoose');
const {schema} = require('./schema');
module.exports = mongoose.model('Consumer', schema);