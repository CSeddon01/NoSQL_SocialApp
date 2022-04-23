const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

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
    friend: [
       { 
        type: Schema.Types.ObjectId,
        ref: 'User'
       }
    ]
},
{
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
  );

  UserSchema.virtual('friendCount').get(function() {
    return this.friend.length;
  });
  
  const User = model('User', UserSchema);
  
  module.exports = User;