var User = require('../schemas/User');
//api/user Route

exports.postUser = function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.dogs = req.body.dogs;
  user.connections = req.body.connections;
  user.rejections = req.body.rejections;
  user.possibles = req.body.possibles;
  user.status = "active";

  user.save(function(err){
    if(err) {

      return res.send(err);
    }

      return res.json('Welcome to WoofPals');
  });
};

//api/user route GET
exports.getUsers = function(req, res){
  User.find({}).then(function(err, users){
  if(err) {
    return res.send(err);
    }
    console.log(users);
    return res.json(users);
  }
)};

//api/user/:User_id GET
exports.getProfile = function(req, res){
  User.findById(req.params.User_id).then(function(err, dog){
    if (err) {
      return res.send(err);
    }
      return res.json(dog);
  });
};

exports.editUser = function(req, res){
  User.update({_id:req.params.User_id}, req.body).exec().then(function(err, user){
    if(err){
      return res.send(err);
    }

    res.status(200).end();
}
)};

exports.editDogs = function(req, res){
  User.findById(req.params.User_id).then(function(user){
    if(!user){
      return res.status(404).end();
    }
    console.log(3333, req.body);
    user.dogs.push(req.body);
    user.save();
    console.log(4444, user);
  });
    return res.status(201).end();
  };

exports.statusChange = function(req, res){
  User.findById(req.params.User_id).then(function(user){
    if(!user){
      return res.status(404).end;
    }
    user.status = "archived";
    user.save();
    return res.status(201).end();
  });
};

//Need to make a route that posts to the possibles, connections and rejections reference arrays

exports.postPossibles = function (req, res){
  User.findById(req.params.User_id).then(function(user){
    if(!user){
      console.log(111,"gettingError");
      return res.status(404).end();

    }
    User.findById(req.body._id, function( err, user2) {
      console.log(44444, user2);
      if(!user2) {
        console.log(6666);
        return res.status(404).end();
      }
      var arr = user.possibles;
      var arr2 = user2.possibles;

      if(user2.possibles.length === 0) {
          console.log(555555);
        user.possibles.push(user2._id);
        user.save();
        res.status(200).end();
      }
      else if(user2.possibles.length > 0){
        console.log(93939, "yes");
        for (var i = 0; i <= user2.possibles.length - 1; i++){
         console.log(i, user2.possibles.length);
         console.log(73837, user2.possibles[i]);
         console.log(848484, user._id);
          if(user2.possibles.indexOf(user._id) > -1){
            console.log('user is a possible connection');
            // console.log(1111, user, user2);
            user.connections.push(user2);
            user2.connections.push(user);
            // console.log(2222, user, user2);
            user2.save();
            user.save();
            // console.log(3333, user, user2);
            res.status(200).end();
          }
          else {
            // user.possibles.push(user2);
            // user.save();
            // console.log(22222, user2);
            console.log('user not a connection');
            res.status(200).end();
          }
        }
      }
    });
  });
};

exports.getConnections = function(req, res){
  User.findById(req.params.User_id).populate("connections").then(function(user){
      if(!user)
        return res.status(404).end();

      return res.status(200).end();
  });
};
