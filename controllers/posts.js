import Post from '../models/Post.js';
import User from '../models/User.js';

import { createNewPost } from '../services/posts.js';

/* CREATE */
export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;

		const createdPost = await createNewPost({
			userId,
			description,
			picturePath,
		});

		if (createdPost.data) {
			return res.status(201).json({ data: createdPost.data, error: null });
		} else {
			return res.status(500).json({ data: null, error: createdPost.error });
		}
	} catch (err) {
		res.status(500).json({ data: null, error: err.message });
	}
};

/* READ */
export const getFeedPosts = async (req, res) => {
	try {
		const post = await Post.find();
		res.status(200).json({ data: post, error: null });
	} catch (err) {
		res.status(404).json({ data: null, error: err.message });
	}
};

export const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const post = await Post.find({ userId });
		res.status(200).json({ data: post, error: null });
	} catch (err) {
		res.status(404).json({ data: null, error: err.message });
	}
};

/* UPDATE */
export const likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ likes: post.likes },
			{ new: true }
		);

		res.status(200).json({ data: updatedPost, error: null });
	} catch (err) {
		res.status(404).json({ data: null, error: err.message });
	}
};
