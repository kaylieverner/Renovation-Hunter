// Requiring our models and passport as we've configured it
var passport = require('../config/passport');

// var passportWorker = require('../config/passportWorker');
var db = require('../models/');

module.exports = function (app) {

  //POST ROUTES//

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/loginuser', passport.authenticate('user'), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post('/api/loginWorker', passport.authenticate('worker'), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });

  });

  app.post('/api/posts', function (req, res) {
    db.Job.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.jobDescription,
      timeframe: req.body.timeframe,
      UserId: '1' //Need to update
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.post('/api/signupuser', function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNum: req.body.phoneNum,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip

    })
      .then(function (user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          user.password = undefined;
          res.json(user);
        });

      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.post('/api/signupbusiness', function (req, res) {
    db.Worker.create({
      email: req.body.email,
      password: req.body.password,
      phoneNum: req.body.phoneNum,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      companyName: req.body.companyName,
      licenseNum: req.body.licenseNum
    })
      .then(function (user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          user.password = undefined;
          res.json(user);
        });

      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });


  // GET route for getting all of the posts
  app.get('/api/posts', function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.userId = req.query.user_id;
    }
    db.Job.findAll({
      where: query
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  // app.get('/api/posts/:id', function (req, res) {
  //   db.Job.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (dbPost) {
  //     console.log(dbPost);
  //     res.json(dbPost);
  //   });
  // });

  //POST route for saving new job posts


  // DELETE route for deleting job posts
  app.delete('/api/posts/:id', function (req, res) {
    db.Job.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating job posts
  app.put('/api/posts', function (req, res) {
    db.Job.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbPost) {
      res.json(dbPost);
    });
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  // Route for logging user out
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get('/api/jobs/', function(req, res) {
    db.Job.findAll()
      .then(function(dbJob) {
        res.json(dbJob);
      });
  });

  app.get('/api/jobs/category/:category', function(req, res) {
    db.Job.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbJob) {
        res.json(dbJob);
      });
  });

  app.get('/api/users/', function (req, res) {
    db.User.findAll()
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });

  app.get('/api/users/user/:userId', function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.userId
      }
    })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });
};


