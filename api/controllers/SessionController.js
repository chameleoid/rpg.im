/**
 * SessionController
 *
 * @description :: Server-side logic for managing Sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require('async');

function errorResponse(res, fn) {
  var code = this;

  return function(err) {
    if (err) {
      return res.send(err, code);
    }

    var args = Array.prototype.slice.call(arguments, 1);

    return fn.apply(fn, args);
  };
}

module.exports = {

  create: function(req, res) {
    var e = errorResponse.bind(500, res);

    async.series(
      { map: function(cb) {
        Map.create({}, cb);
      }},

      e(function(r) {
        Session.create({ map: r.map.id }, e(function(session) {
          return res.redirect('/session/' + session.id);
        }));
      })
    );
  },

  find: function(req, res) {
    return res.view('session/create');
  },

  findOne: function(req, res) {
    var e = errorResponse.bind(404, res);

    Session
      .findOneById(req.params.id)
      .populate('messages')
      .populate('map')
      .exec(e(function(session) {
        if (!req.isSocket) {
          res.view('session/index');
        } else {
          res.json(session);
          Session.subscribe(req.socket, session.id, 'message');
          Map.subscribe(req.socket, session.map.id, 'update');
        }
      }));
  },

};

