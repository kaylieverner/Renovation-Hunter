// Requiring path to so we can use relative routes to our HTML files
var path = require('path');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {

  app.get('/', function(req, res) {
    // If the user already has an account send them to the login page
    if (req.user) {
      res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, '../public/stylesheets.signup.html'));
  });

  app.get('/contractors', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/stylesheets/contractors.html'));
  });

  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/stylesheets/login.html'));
  });

  app.get('/postEditor', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/stylesheets/postEditor.html'));
  });

  app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/stylesheets/signup.html'));
  });

  app.get('/users', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/stylesheets/users.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/users', isAuthenticated, function(req, res) {

    res.sendFile(path.join(__dirname, '../public/stylesheets/users.html'));
  });

  app.get('/contractors', isAuthenticated, function(req, res) {

    res.sendFile(path.join(__dirname, '../public/stylesheets/contractors.html'));
  });

};




