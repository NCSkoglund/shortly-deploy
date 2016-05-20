// var schema = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

exports.userSchema = mongoose.Schema({ 
  username: String,
  password: String,
  timestamp: Date
});

exports.User = mongoose.model('User', exports.userSchema);

exports.userSchema.methods.hash = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.get(function() {
    return this.password;
  }), null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
  });
  // return cipher(this.password, null, null).bind(this)
  //   .then(function(hash) {
  //     this.password = hash;
  //     // set password on  our DB
  //     // this.set('password', hash);
  //   });
};

exports.userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  return true;
  // bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
  //   callback(isMatch);
  // });
};

// module.exports = User;

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   }
// });

