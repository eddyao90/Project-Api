const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    selectedFile: String,
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