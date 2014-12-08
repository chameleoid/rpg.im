/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    Session
      .findOneById(req.body.session)
      .exec(function(err, session) {
        if (err || !session) {
          return res.send(err, 404);
        }

        Message
          .create(
            {
              session: session.id,
              type: req.body.type || 'message:ic',
              body: req.body.body,
            },
            function(err, message) {
              if (err) {
                return res.send(err, 500);
              }

              if (req.isSocket) {
                Session.message(session.id, {
                  origin: 'chat',
                  content: message.toObject(),
                });
              }
            }
          );
      });
  },

};

