  var   express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       cors = require('cors'),
       mongoose = require('mongoose'),
       port = 8872,
       mongoUri = 'mongodb://localhost:27017/pawpals',
       router = express.Router(),
       appRoutes = require('./serverResources/routes/appRoutes.js'),
       User = require('./serverResources/schemas/User.js');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));
  app.use('/api', router);

  router.route('/user')
    .post(appRoutes.postUser)
    .get(appRoutes.getUser);

  

  mongoose.connect(mongoUri);
  mongoose.connection.once('open', function() {
      console.log('Connected to MongoDB at ' + mongoUri);
  });


  app.listen(port, function() {
      console.log('Listening on ' + port);
  });
