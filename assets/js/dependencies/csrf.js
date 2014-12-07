(function(_csrf, io) {
  io.socket.on('connect', function() {
    io.socket.get('/csrfToken', function(data) {
      _csrf = data._csrf;
    });

    if (!io.socket._post) {
      io.socket._post = io.socket.post;

      io.socket.post = function(url, data, cb) {
        data = data || {};
        data._csrf = _csrf;
        return io.socket._post(url, data, cb);
      };
    }
  });
})(_csrf, io);
