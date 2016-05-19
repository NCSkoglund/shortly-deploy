var path = require('path');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var mongo = require('mongodb');

mongoose.createConnection('mongodb://127.0.0.1:27017');
var db = mongoose.connection;
// db.connect('mongodb://localhost:4568', function(err) {
//   if (err) {
//     console.error('error in connection', err);
//   } else {
//     console.log('yay.');
//   }
// });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log.bind(console, 'Hooray');
});

db.userSchema = mongoose.Schema({ 
  username: String,
  password: String,
  timestamp: Date
});

// newUser.hash(password);
db.userSchema.methods.hash = function() {
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

db.linkSchema = mongoose.Schema({
  baseUrl: String,
  title: String,
  visits: Number,
  timestamp: Date
});

// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });
// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

//({
//   client: 'mongodb',
//   connect: {
//     filename: path.join(__dirname, '../db/shortly.mongo')
//   },
//   useNullAsDefault: true
// });
module.exports = db;
