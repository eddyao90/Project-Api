const Post = require('../models/Post');
const mongoose = require('mongoose');
const { posts } = require('../config/routes.config');
 

module.exports.getPosts = async (req, res) => { 
  try {
      const postMessages = await Post.find();
              
      res.status(200).json(postMessages);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

module.exports.getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await Post.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

module.exports.createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new Post({ title, message, selectedFile, creator, tags })

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}
