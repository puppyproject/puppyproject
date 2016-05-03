var   express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       cors = require('cors'),
       mongoose = require('mongoose'),
       port = 8100,
      //  mongoUri = 'mongodb://localhost:27017/woofpals',
       router = express.Router(),
       appRoutes = require('./serverResources/routes/appRoutes.js'),
       User = require('./serverResources/schemas/User.js'),
       passport = require('passport'),
       jwt = require('jwt-simple'),
       config = require("./serverResources/config/database.js"),
       mongoUri = config.mlab,
       morgan = require('morgan'),
      //  session = require('express-session'),
      //  FacebookStrategy = require('passport-facebook'),
       makeSendtoken = require('./serverResources/config/jwt.js');

       app.use(bodyParser.json());
         app.use(bodyParser.urlencoded({extended:true}));
         app.use(cors());
         app.use(morgan('dev'));
         app.use(express.static(__dirname + '/www'));
         app.use(passport.initialize());
         // app.use(passport.session());
         app.use('/api', router);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/www'));
  app.use(passport.initialize());
  // app.use(passport.session());
  app.use('/api', router);

  router.route('/user')
    .post(appRoutes.postUser)
    .get(appRoutes.getUsers);

  router.route('/user/:User_id')
    .get(appRoutes.getProfile)
    .put(appRoutes.editUser)
    .delete(appRoutes.statusChange);

  router.route('/user/:User_id/dogs')
    .put(appRoutes.editDogs);

  router.route('/user/:User_id/connections')
    .put(appRoutes.postPossibles)
    .get(appRoutes.getConnections);

  router.route('/user/:User_id/rejections')
    .put(appRoutes.postRejections);



    //***********AUTHORIZATION************\\
  require('./serverResources/config/passport')(passport);

  router.post('/signup', function(req, res){
    if (!req.body.email || !req.body.password) {
   res.json({success: false, msg: 'Please pass name and password.'});
 } else {
   var newUser = new User({
     email: req.body.email,
     password: req.body.password
   });
   // save the user
   console.log(444, req.body);
   newUser.save(function(err) {
    console.log(err);
     if (err) {
       return res.json({success: false, msg: 'Username already exists.'});
     }
     return res.json({success: true, msg: 'Successful created new user.'});
   });
 }
  });

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  router.post('/authenticate', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            console.log('User: ', user);
            console.log('Secret', config.secret);
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token, user: user});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

// route to a restricted info (GET http://localhost:8080/api/memberinfo)
  router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    console.log(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);

      User.findOne({
        email: decoded.email
      }, function(err, user) {
          if (err) throw err;

          if (!user) {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
          } else {
            res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
          }
      });
    } else {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  });

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
//***********************************************\\


  mongoose.connect(mongoUri);
  mongoose.connection.once('open', function() {
      console.log('Connected to MongoDB at ' + mongoUri);
  });


  app.listen(port, function() {
      console.log('Listening on ' + port);
  });
