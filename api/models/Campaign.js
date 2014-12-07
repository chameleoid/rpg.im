/**
* Campaign.js
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

    name: {
      type: 'text',
      required: true,
    },

    public: {
      type: 'boolean',
      defaultsTo: false,
    },

    owner: {
      model: 'user',
      required: true,
    },

    /*maps: {
      collection: 'map',
      via: 'campaign',
    },*/

    characters: {
      collection: 'character',
      via: 'campaign',
    },

    sessions: {
      collection: 'session',
      via: 'campaign',
    },
  },

};

