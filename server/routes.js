var mongolib = require('./lib/program'),
  Program = mongolib.Program,
  programPath = '/v1/program';

exports = module.exports = function(app) {

  // Program
  app.get(programPath + '/:id?', function(req, res, next) {
    // req.query or req.body
    if (req.params.id) {
      req.query._id = req.params.id;
    }
    Program.read(req.query, function(err, result) {
      if (err) {
        next(err);
      }
      res.json(result);
    });
  });

  app.post(programPath, function(req, res, next) {
    Program.update(req.body, function(err, result) {
      if (err) {
        next(err);
      }
      res.json(201, {_id: result._id});
    });
  });

  app.put(programPath, function(req, res, next) {
    Program.create(req.body, function(err, result) {
      if (err) {
        next(err);
      }
      res.json(201, {_id: result._id});
    });
  });

  app.delete(programPath + '/:id', function(req, res, next) {
    Program.delete(req.params.id, function(err, result) {
      if (err) {
        next(err);
      }
      res.json({_id: req.params.id});
    });
  });


  // route not found
  app.all('*', function(req, res) {
    res.status(404);
    if (req.xhr) {
      res.send({ error: 'Resource not found.' });
    }
    res.send('404 Not Found Dude!');
  });

};

