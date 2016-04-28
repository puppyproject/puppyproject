var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  email: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
       humanName:{type:String},
       dogs:{
            name:{type:String, default: 'dogName'},
            age:{type:Number, default: 1},
            gender:{type:String, default: 'gender'},
            size:{type:String, default: 'size'},
            breed:{type:String, default: 'breed'},
            description:{type:String, default: 'description'},
            fixed:{type:Boolean, default: false},
            image:{data: Buffer, contentType:String}
        },
      connections:[{type:Schema.Types.ObjectId, ref:"User"}],
      rejections:[{type:Schema.Types.ObjectId, ref:"User"}],
      possibles:[{type:Schema.Types.ObjectId, ref:"User"}],
      facebookId:String,
      status:{type:String, enum:["active", "archived"]}
  });

  userSchema.pre('save', function (next) {
      var user = this;
      if (this.isModified('password') || this.isNew) {
          bcrypt.genSalt(10, function (err, salt) {
              if (err) {
                  return next(err);
              }
              bcrypt.hash(user.password, salt, function (err, hash) {
                  if (err) {
                      return next(err);
                  }
                  user.password = hash;
                  next();
              });
          });
      } else {
          return next();
      }
  });

  userSchema.methods.comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
          if (err) {
              return cb(err);
          }
          cb(null, isMatch);
      });
  };

module.exports = mongoose.model('User', userSchema);
