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
  // console.log(res);
  User.findById(req.params.User_id).then(function(user){
    if(!user)
      return res.status(404).end;

      //Checking for a match in Connections and Possibles
      var arr = user.possibles;
      for(var i = 0; i < arr.length; i++){
        if(arr[i] === req.body){
          user.connections.push(req.body);
          user.save();
          res.status(200).end();
        }

        else {
        user.possibles.push(req.body);
        user.save();
        res.status(200).end();
      }
    }
  });
};
