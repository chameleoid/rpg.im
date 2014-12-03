/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

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

    passports: {
      collection: 'Passport',
      via: 'user'
    },

    characters: {
      collection: 'character',
      via: 'owner',
    },

    toJSON: function() {
      var obj = this.toObject();

      delete obj.id;
      delete obj.passports;
      delete obj.createdAt;
      delete obj.updatedAt;

      return obj;
    },
  },

};
