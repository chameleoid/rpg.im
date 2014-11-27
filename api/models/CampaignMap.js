/**
* CampaignMap.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    private: {
      type: 'boolean',
      defaultsTo: false,
    },

    visible: {
      type: 'boolean',
      defaultsTo: false,
    },

    data: {
      type: 'json',
    },

    owner: {
      model: 'user',
      required: true,
    },

    campaign: {
      model: 'campaign',
    },
  },

};

