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

exports.addDog = function(req, res){
  User.findById(req.params.User_id).then(function(user){
    if(!user){
      return res.status(404).end();
    }
    console.log(3333, req.body);
    user.dogs.name = req.body.name;
    user.dogs.age = req.body.age;
    user.dogs.gender =req.body.gender;
    user.dogs.size = req.body.size;
    user.dogs.breed =req.body.breed;
    user.dogs.description = req.body.description;
    user.dogs.fixed = req.body.fixed;
    user.dogs.image = req.body.image;
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
      // console.log(44444, user2);
      if(!user2) {
        // console.log(6666);
        return res.status(404).end();
      }

      if(user2.possibles.length === 0) {
          console.log(555555);
        user.possibles.push(user2._id);
        user.save();
        res.status(200).end();
      }
      else if(user2.possibles.length > 0){
        // console.log(93939, "yes");
        for (var i = 0; i <= user2.possibles.length - 1; i++){
        //  console.log(i, user2.possibles.length);
        //  console.log(73837, user2.possibles[i]);
        //  console.log(848484, user._id);
          if(user2.possibles.indexOf(user._id) > -1){
            // console.log('user is a possible connection');
            // console.log(1111, user, user2);
            user.connections.push(user2);
            user2.connections.push(user);
            //enter slice here
            user2.possibles.splice(i, 1);
            // console.log(2222, user, user2);
            user2.save();
            user.save();
            // console.log(3333, user, user2);
            console.log('getting passed the save');
            return res.status(200).end();
            // return res.status(200).end();
        }
          else {
            user.possibles.push(user2);
            user.save();
            // console.log(22222, user2);
            // console.log('user not a connection');
            res.status(200).end();
          }
        }
      }
    });
  });
};

//********REFACTORING ATTEMPT USING MONGODB*********
// exports.postPossibles = function (req, res){
//   var User1, User2;
//
//   User.findById(req.params.User_id, function(err, queriedUser1) {
//     if(err)
//       return res.status(300).send(err);
//     else {
//       User1 = queriedUser1;
//       User.findById(req.body._id, function(err, queriedUser2) {
//         if(err)
//           return res.status(300).send(err);
//         else
//           User2 = queriedUser2;
//
//             // if User2 has no possibles
//             // add to possibles
//             if(User2.possibles.length) {
//               console.log("----THIS IS A NEW USER----");
//               User.findByIdAndUpdate(
//                 User1._id,
//                 {$addToSet: {connections: User2._id}},
//                 {safe: true, upsert: true, new: true},
//                 function(err, updatedUser1) {
//                   if(err)
//                     return res.status(301).send(err);
//                   else
//                     return res.status(200).send(updatedUser1);
//                 }
//               );
//             }
//             else {
//               //if in either possibles or connections
//               if(User2.possibles.indexOf(User1._id) > -1 || User2.connections.indexOf(User1._id) > -1) {
//
//                 // if IN possibles but NOT connections
//                 // remove from both Users possibles and
//                 // add to connections
//                 if(User2.possibles.indexOf(User1._id) > -1 || User2.connections.indexOf(User1._id) === -1) {
//                   User.findByIdAndUpdate(
//                     User1._id,
//                     {
//                       $addToSet: {connections: User2._id},
//                       $pullAll: {possibles: User2._id}
//                     },
//                     {safe: true, upsert: true, new: true},
//                     function(err, updatedUser1) {
//                       if(err)
//                         res.status(300).send(err);
//                       else
//                         res.status(200).send(updatedUser1);
//                     }
//                   );
//                   User.findByIdAndUpdate(
//                     User2._id,
//                     {
//                       $addToSet: {connections: User1._id},
//                       $pullAll: {possibles: User1._id}
//                     },
//                     {safe: true, upsert: true, new: true},
//                     function(err, updatedUser2) {
//                       if(err)
//                         res.status(300).send(err);
//                       else
//                         res.status(200).send(updatedUser2);
//                     }
//                   );
//                 }
//                 //if NOT in possibles but IS is connections
//                 else {
//                   res.status(200).send(JSON.stringify("Already in Connections"));
//                 }
//               }
//               //if not in either possibles or connections
//               //add to possibles
//               else {
//                 User.findByIdAndUpdate(
//                   User2._id,
//                   { $addToSet: {possibles: User1._id} },
//                   {safe: true, upsert: true, new: true},
//                   function(err, updatedUser2) {
//                     if(err)
//                       res.status(300).send(err);
//                     else
//                       res.status(200).send(updatedUser2);
//                   }
//                 );
//               }
//             }
//           }
//       );
//     }
//   });
// };

exports.getConnections = function(req, res){
  User.findById(req.params.User_id).populate("connections").then(function(user){
      if(!user){
        return res.status(404).end();
      }
      res.json(user);
      // return res.status(200).end();
  });
};

exports.postRejections = function(req, res){
  User.findById(req.params.User_id, function(err, user){
      if(!user){
        return res.status(404).end();
      }

      console.log(2222, user);
      user.rejections.push(req.body._id);
      user.save();
      console.log("Rejection Pushed");
      console.log(req.body._id);
      return res.status(200).end();
  });
};

exports.editDog = function(req, res){
  User.findById(req.params.User_id, function(err, user){
    if(!user){
      console.log("getting Error");
      return res.status(404).end();
    }
    var updates = req.body;
    var dog = user.dogs;
    for (var k in updates){
      dog[k] = updates[k];
    }
    user.save(function(err){
      if(err){
        console.log(333, err);
        return res.send(err);
      }
      return res.json(user);
    });

  });
};
