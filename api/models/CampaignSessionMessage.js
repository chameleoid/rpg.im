/**
* CampaignSessionMessage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    body: {
      type: 'string',
    },

    type: {
      type: 'string',
      enum: ['message', 'roll', 'join', 'leave'],
      defaultsTo: 'message',
    },

    user: {
      model: 'user',
      required: true,
    },

    session: {
      model: 'campaignsession',
      required: true,
    },

    toJSON: function() {
      var obj = this.toObject();

      obj.timestamp = obj.createdAt;

      delete obj.id;
      delete obj.session;
      delete obj.updatedAt;
      delete obj.createdAt;

      return obj;
    },
  },

};

