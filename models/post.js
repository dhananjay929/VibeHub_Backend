const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:User
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "vibes"
  },
  author: {
     type:String
  },
  date:{
      type: Date,
      default: Date.now
  }
},
{
  collection: "Userpost",
}
);

const Userpost = mongoose.model('Userpost', postSchema);

module.exports = Userpost;

