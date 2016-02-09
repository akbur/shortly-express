var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimeStamps: false,

  initialize: function(){
    this.on('creating', this.hashedPassword, this);
  },

  hashedPassword: function(model, attrs, options){
    return new Promise(function(resolve, reject){
      console.log('username', model.attributes.username);
      console.log('password', model.attributes.password);
      bcrypt.hash(model.attributes.password, 10, null, function(err, hash){
        if (err) {
          reject(err);
        }
        model.set('password', hash);
        console.log(1);
        resolve(hash);
      });
    });
  }

});

module.exports = User;