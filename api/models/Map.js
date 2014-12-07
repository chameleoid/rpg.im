/**
* Map.js
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
  },

};

