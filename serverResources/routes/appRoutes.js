var userSchema = require('../schemas/User');

exports.postUser = function(req, res){
  var user = new userSchema();
  user.name = req.body.name;
  user.email = req.body.email;
  user.dogs = req.body.dogs;
  user.connections = req.body.connections;
  user.rejections = req.body.rejections;
  user.possibles = req.body.possibles;

  user.save(function(err){
    if(err)
      return res.send(err);

      return res.json('Welcome to WoofPals');

  });
};

exports.getUsers = function(req, res){
  userSchema.find(function(err, dogs){
  if(err)
    return res.send(err);

    console.log(dogs);
    return res.json(dogs);
  }
)};

exports.getUser = function(req, res){
  userSchema.findById({_id:req.params.user_id}, function(err, dog){
    if (err)
      return res.send(err);

      console.log(dog);
      return res.json(dog);
  });
};

exports.editUser = function(req, res){
  userSchema.findById(req.params.user_id, function(err, res){
    if(err)
      return res.send(err);
  });

  //Make edits here, only changing the name currently because not sure what needs to be changed by the user.
  user.name = req.body.name;

  user.save(function(err){
    if(err)
      return res.send(err);

      return res.json(user);
  });

};
