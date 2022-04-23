const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reationBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        minlength: [1, 'Please tell us more of your thoughts on this'],
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: "Please enter your name"
    },
    //Array of nested documents created with the reactionSchema
    reaction: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;