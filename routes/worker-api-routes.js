var passport = require('../config/passport');
var db = require('../models/');

module.exports = function(app) {
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post('/api/signup', function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, '/api/login');
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Find all workers and return them to the user with res.json
  app.get('/api/workers', function(req, res) {
    db.Author.findAll({}).then(function(dbWorker) {
      res.json(dbWorker);
    });
  });

  app.get('/api/authors/:id', function(req, res) {
    db.Worker.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbWorker) {
      res.json(dbWorker);
    });
  });



};