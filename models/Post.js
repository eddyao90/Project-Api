const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;