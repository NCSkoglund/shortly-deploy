// var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');

linkSchema = mongoose.Schema({
  baseUrl: String,
  title: String,
  visits: Number,
  timestamp: Date
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });