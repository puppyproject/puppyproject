var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:{type:String},
  email:{type:String, required:true, unique:true},
  dogs:[{
    name:{type:String},
     age:{type:Number},
     gender:{type:String},
      size:{type:String},
      breed:{type:String},
      description:{type:String},
      fixed:{type:Boolean}
    }],
  connections:[{type:Schema.Types.ObjectId, ref:"User"}],
  rejections:[{type:Schema.Types.ObjectId, ref:"User"}],
  possibles:[{type:Schema.Types.ObjectId, ref:"User"}],
  facebookId:String,
  status:{type:String, enum:["active", "archived"]}
});

module.exports = mongoose.model('User', userSchema);