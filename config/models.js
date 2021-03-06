/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  migrate: (process.env.NODE_ENV &&
            process.env.NODE_ENV !== 'development') ? 'safe' : null,

  connection: (process.env.NODE_ENV &&
               process.env.NODE_ENV !== 'development') ? 'mongo' : 'local',

};
