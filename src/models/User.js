const appMongoose = require('mongoose');
const Schema = appMongoose.Schema;
const schema = new appMongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    Min: 2,
    Max: 30,
    required: true
  },
  lastName: {
    type: String,
    Min: 2,
    Max: 30,
    required: true
  }
});
module.exports = appMongoose.model('user', schema);
