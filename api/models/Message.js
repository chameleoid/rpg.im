/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      defaultsTo: function() {
        return Math.floor(Math.random() * parseInt('zzzzzzzzz', 36)).toString(36);
      },
    },

    body: {
      type: 'string',
    },

    type: {
      type: 'string',
      enum: ['message:ic', 'message:ooc', 'roll', 'join', 'leave'],
      defaultsTo: 'message:ic',
    },

    user: {
      model: 'user',
      //required: true,
    },

    session: {
      model: 'session',
      required: true,
    },

    toJSON: function() {
      var obj = this.toObject();

      delete obj.id;
      delete obj.session;
      delete obj.updatedAt;

      return obj;
    },
  },

};

