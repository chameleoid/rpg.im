(function(_csrf, io) {
  var methods = ['post', 'put', 'delete'];

  io.socket.on('connect', function() {
    io.socket.get('/csrfToken', function(data) {
      _csrf = data._csrf;
    });

    if (!io.socket._request_) {
      io.socket._request_ = io.socket._request;

      io.socket._request = function(options, cb) {
        options = options || {};

        if (methods.indexOf(options.method) > -1) {
          options.headers = options.headers || {};
          options.headers['X-CSRF-Token'] = options.headers['X-CSRF-Token'] || _csrf;
        }

        return io.socket._request_(options, cb);
      };
    }
  });
})(_csrf, io);
