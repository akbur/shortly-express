var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var promisedHash = Promise.promisify(bcrypt.hash);
var promisedCompare = Promise.promisify(bcrypt.compare);

var User = db.Model.extend({
  tableName: 'Users',
  hasTimeStamps: false,

  initialize: function () {
    this.on('creating', this.hashPassword, this);
  },

  hashPassword: function (model, attrs, op) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(model.get('password'), null, null, function (err, hash) {
        if (err) {
          reject(err);
        }
        model.set('password', hash);
        resolve(hash);
      });
    });
  },

  checkPassword: function (password, hash) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hash, function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
});

module.exports = User;
