/**
 * CampaignSessionMessageController
 *
 * @description :: Server-side logic for managing Campaignsessionmessages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    CampaignSession
      .findOneById(req.params.session)
      .exec(function(err, session) {
        if (err) {
          return res.send(err, 400);
        }

        CampaignSessionMessage
          .create(
            {
              session: session.id,
              user: '3m5589oy5', //req.session.user.id,
              body: req.params.body,
            },
            function(err, message) {
              if (err) {
                return res.send(err, 500);
              }

              message.user = req.session.user;

              if (req.isSocket) {
                CampaignSessionMessage
                  .publishCreate(message.toJSON(), req.socket);
              }

              return res.json(message);
            }
          );
      });
  },
};

