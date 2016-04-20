  var   express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       cors = require('cors'),
       mongoose = require('mongoose'),
       port = 8873,
       mongoUri = 'mongodb://localhost:27017/pawpals',
       router = express.Router(),
       appRoutes = require('./serverResources/routes/appRoutes.js'),
       User = require('./serverResources/schemas/User.js'),
      //  passport = require('passport'),
      //  session = require('express-session'),
       FacebookStrategy = require('passport-facebook'),
       facebookAuth = require('./serverResources/config/facebookAuth.js'),
       jwt = require('jwt-simple'),
       makeSendtoken = require('./serverResources/config/jwt.js');


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));
  // app.use(passport.initialize());
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
    .put(appRoutes.postPossibles);



  app.post('/auth/facebook', facebookAuth);




  mongoose.connect(mongoUri);
  mongoose.connection.once('open', function() {
      console.log('Connected to MongoDB at ' + mongoUri);
  });


  app.listen(port, function() {
      console.log('Listening on ' + port);
  });
