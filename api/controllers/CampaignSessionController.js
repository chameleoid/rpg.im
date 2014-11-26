/**
 * CampaignSessionController
 *
 * @description :: Server-side logic for managing Campaignsessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var user = req.session.user;
    var campaign = req.params.campaign;

    CampaignSession
      .create(
        {
          owner: '3m5589oy5', // user.id
          campaign: campaign,
        },
        function(err, session) {
          if (err) {
            return res.send(err, 500);
          }

          return res.redirect('/campaign/' + campaign + '/session/' + session.id);
        }
      );
  },

  index: function(req, res) {
    CampaignSession
      .findOneById(req.params.session)
      .exec(function(err, session) {
        if (err) {
          return res.send(err, 404);
        }

        CampaignSessionMessage
          .find({
            where: { session: session.id },
            sort: { createdAt: 'desc' },
            limit: 30,
          })
          .populate('user')
          .exec(function(err, messages) {
            res.json(messages);
          });
      });
  },

};

