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
          options.data = options.data || {};
          options.data._csrf = options.data._csrf || _csrf;
        }

        return io.socket._request_(options, cb);
      };
    }
  });
})(_csrf, io);
