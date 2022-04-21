const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Please enter a thought",
        minLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: "Please enter your name"
    },
    // reactions: [ReactionsSchema]
},
{ 
    toJSON: {
        virtuals: true, 
        getters: true
    },
    id: false
}
);

// ThoughtsSchema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// })

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;