/**
* Campaign.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    owner: {
      model: 'user',
    },

    users: {
      collection: 'user',
      via: 'campaigns',
    },

    maps: {
      collection: 'campaignmap',
      via: 'campaign',
    },

    characters: {
      collection: 'character',
      via: 'campaign',
    },

    sessions: {
      collection: 'campaignsession',
      via: 'campaign',
    },
  },

};

