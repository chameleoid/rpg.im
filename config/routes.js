/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  'get /': { view: 'index' },

  // Passport
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  // Campaign management
  'post /api/campaign/create': 'CampaignController.create',
  'get /campaign/create': { view: 'campaign/create' },

  'get /api/campaign/:campaign': 'CampaignController.index',
  'get /campaign/:campaign': { view: 'campaign' },

  // Sessions
  'post /api/campaign/:campaign/session/create': 'CampaignSessionController.create',
  'get /campaign/:campaign/session/create': { view: 'campaign/session/create' },

  'get /api/campaign/:campaign/session/:session': 'CampaignSessionController.index',
  'get /campaign/:campaign/session/:session': { view: 'campaign/session' },

  'get /api/campaign/:campaign/session/:session/message': 'CampaignSessionMessageController.create',

};
