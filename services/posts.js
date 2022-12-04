import User from '../models/User.js';
import Post from '../models/Post.js';

/* CREATE NEW USER (CREATE)*/
export const createNewPost = async ({ userId, description, picturePath }) => {
	try {
		const user = await User.findById(userId);
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: [],
		});
		await newPost.save();

		const post = await Post.find();

		if (post) {
			return {
				data: post,
				error: null,
			};
		}
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};

/* FIND EXISTING USER (READ)*/
export const getUser = async (id) => {
	try {
		const user = await User.findOne({ id: id });

		if (!user) {
			return {
				data: null,
				error: 'Username or email does not exist',
			};
		}

		return {
			data: user,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};
