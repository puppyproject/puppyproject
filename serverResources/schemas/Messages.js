var mongoose = require('mongoose');

var Schema = mongoose.schema;

var messageSchema = new Schema ({
  time: {type:String},
  message:{type:String},
  userCode:{type:String},   //Should have to populate with the connecting id's
});
