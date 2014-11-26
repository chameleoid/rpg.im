/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var user = req.session.user;

    Campaign
      .create(
        {
          owner: '3m5589oy5', // user.id
        },
        function(err, campaign) {
          if (err) {
            return res.send(err, 500);
          }

          return res.redirect('/campaign/' + campaign.id);
        }
      );
  },

  index: function(req, res) {
    Campaign
      .findOneById(req.params.campaign)
      .exec(function(err, campaign) {
        if (err) {
          return res.send(err, 400);
        }

        res.json(campaign);
      });
  },

};

