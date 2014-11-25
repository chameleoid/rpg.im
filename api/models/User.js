/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
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
    },

    campaigns: {
      collection: 'campaign',
    },

    characters: {
      collection: 'character',
      via: 'owner',
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

