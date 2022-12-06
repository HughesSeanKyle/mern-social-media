import User from '../models/User.js';

/* CREATE NEW USER (CREATE)*/
export const createUser = async ({
	firstName,
	lastName,
	email,
	passwordHash,
	picturePath,
	friends,
	location,
	occupation,
}) => {
	try {
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			return {
				data: null,
				error: 'User already exists',
			};
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			// Generate random num from 0 to 10000
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});
		const savedUser = await newUser.save();

		if (savedUser) {
			return {
				data: savedUser,
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
export const getUser = async (email) => {
	try {
		const user = await User.findOne({ email: email });

		console.log('user', user);

		if (!user) {
			return {
				data: null,
				error: 'User does not exist',
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
