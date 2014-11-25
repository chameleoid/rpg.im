/**
* CampaignSession.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    map: {
      model: 'campaignmap',
    },

    campaign: {
      model: 'campaign',
    },

    users: {
      collection: 'user',
    },

    messages: {
      collection: 'campaignsessionmessage',
      via: 'session',
    },
  },

};

