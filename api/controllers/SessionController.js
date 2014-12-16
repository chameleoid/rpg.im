/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    Map.create({}, function(err, map) {
      if (err) {
        return res.send(err, 500);
      }

      Session
        .create(
          {
            map: map.id,
          },

          function(err, session) {
            if (err) {
              return res.send(err, 500);
            }

            return res.redirect('/session/' + session.id);
          }
        );
    });
  },

  find: function(req, res) {
    return res.view('session/create');
  },

  findOne: function(req, res) {
    Session
      .findOneById(req.params.id)
      .populate('messages')
      .exec(function(err, session) {
        if (err) {
          return res.send(err, 404);
        }

        if (!req.isSocket) {
          res.view('session/index');
        } else {
          res.json(session);
          Session.subscribe(req.socket, session, 'message');
        }
      });
  },

};

