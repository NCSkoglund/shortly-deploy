// var schema = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

userSchema = mongoose.Schema({ 
  username: String,
  password: String,
  timestamp: Date
});

var User = mongoose.model('User', userSchema);

userSchema.methods.hash = function() {
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

//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },

module.exports = User;

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   }
// });

