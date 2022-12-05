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
			description: description,
			userPicturePath: user.picturePath,
			picturePath: picturePath,
			likes: {},
			comments: [],
		});

		const savedNewPost = await newPost.save();

		console.log('savedNewPost', savedNewPost);

		// const post = await Post.find();
		// const post = await Post.findOne({ id: savedNewPost.id });

		/*
			Two issues 
			1. Upload not persisting to public folder 
			2. Incorrect description db 
		*/

		if (savedNewPost) {
			return {
				data: savedNewPost,
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
