import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUser } from '../services/auth.js';

/* REGISTER USER */
export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const createNewUser = await createUser({
			firstName,
			lastName,
			email,
			passwordHash,
			picturePath,
			friends,
			location,
			occupation,
		});

		if (createNewUser.error) {
			res.status(409).json({ msg: createNewUser.error });
		}

		if (createNewUser.data) {
			// 201 = created
			res.status(201).json({ data: createNewUser.data });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/* LOGGING IN */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const foundUser = await getUser(email);
		if (foundUser.error) return res.status(400).json({ msg: foundUser.error });

		if (foundUser.data) {
			const isMatch = await bcrypt.compare(password, foundUser.data.password);
			if (!isMatch)
				return res.status(400).json({ msg: 'Invalid credentials. ' });

			const token = jwt.sign(
				{ id: foundUser.data._id },
				process.env.JWT_SECRET
			);
			delete foundUser.data.password;
			res.status(200).json({ token, foundUser });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
