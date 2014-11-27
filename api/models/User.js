/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: function() {
        return Math.floor(Math.random() * parseInt('zzzzzzzzz', 36)).toString(36);
      },
    },

    name: {
      type: 'string',
    },

    username: {
      type: 'string',
      unique: true,
      required: true,
      alphanumericdashed: true,
    },

    email: {
      type: 'email',
      unique: true,
    },

    passphrase: {
      type: 'string',
      minLength: 6,
      columnName: 'hash',
    },

    characters: {
      collection: 'character',
      via: 'owner',
    },

    toJSON: function() {
      var obj = this.toObject();

      delete obj.id;
      delete obj.password;
      delete obj.createdAt;
      delete obj.updatedAt;

      return obj;
    },
  },

  beforeCreate: function(values, cb) {
    bcrypt.hash(values.passphrase, 12, function(err, hash) {
      if (err) {
        return cb(err);
      }

      values.passphrase = hash;

      cb();
    });
  },

};

