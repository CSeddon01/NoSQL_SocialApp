const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Must enter username",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, 'email must be valid']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
       { 
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
       }
    ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
  );

  UserSchema.virtual('friendCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });
  
  const User = model('User', UserSchema);
  
  module.exports = User;