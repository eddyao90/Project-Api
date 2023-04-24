const mongoose = require('mongoose');
const { REQUIRED_FIELD } = require('../config/errorMessages');


const CommentSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: [true, 'Comment here'],
        minLength: [3, ''],
        required: [true, REQUIRED_FIELD]
    },
    whoWrote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;
            delete ret.password;

            return ret
        }
    }
  },
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;