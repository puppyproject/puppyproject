var userSchema = require('../schemas/User');

exports.postUser = function(req, res){
  var User = new userSchema();
  User.name = req.body.name;
  User.email = req.body.email;
  User.dogs = req.body.dogs;
  User.connections = req.body.connections;
  User.rejections = req.body.rejections;
  User.possibles = req.body.possibles;

  User.save(function(err){
    if(err)
      return res.send(err);

      return res.json('Welcome to WoofPals');

  });
};

exports.getUser = function(req, res){
  userSchema.find(function(err, dogs){
  if(err)
    return res.send(err);

    console.log(dogs);
    return res.json(dogs);
  }
)};
