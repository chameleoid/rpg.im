/**
* CampaignSession.js
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

    public: {
      type: 'boolean',
      defaultsTo: false,
    },

    active: {
      type: 'boolean',
      defaultsTo: true,
    },

    map: {
      model: 'campaignmap',
    },

    campaign: {
      model: 'campaign',
      required: true,
    },

    messages: {
      collection: 'campaignsessionmessage',
      via: 'session',
    },
  },

};

