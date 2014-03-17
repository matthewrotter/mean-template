var express = require('express'),
  app = express(),
  http = require('http'),
  path = require('path'),
  port = 4343;


app.configure(function() {
  //settings
  app.disable('x-powered-by');
  app.set('port', port); // BEER: move to redis/magma config
  app.set('strict routing', true);

  //middleware
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.static(path.join(__dirname, './dist')));

  // cross-domain stuff
  var allowCrossDomain = function(req, res, next) {
    var origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
  };
  app.use(allowCrossDomain);
  app.options('/*', function(req, res) {
    res.send(200);
  });

  // app.use(app.router);

  //error handler
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500);
    res.send({ error: err.message });
  });
});


http.createServer(app).listen(port, function() {
  console.log("Express server started with");
  console.log("Port: %s", port);
});

