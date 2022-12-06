import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json({
			data: user,
			error: null,
		});
	} catch (err) {
		res.status(404).json({ data: null, error: err.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);
		res.status(200).json({ data: formattedFriends, error: null });
	} catch (err) {
		res.status(404).json({ data: null, error: err.message });
	}
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			// Remove "Friend" from "User" friend list and remove "User" from "Friend" friend list
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			// Add "Friend" to "User" friend list and add "User" to "Friend" friend list
			user.friends.push(friendId);
			friend.friends.push(id);
		}

		// Persist updated props
		await user.save();
		await friend.save();

		// Get updated "User" friend list
		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);

		// Return updated and formatted "User" friend list
		res.status(200).json({ data: formattedFriends, error: null });
	} catch (err) {
		res.status(404).json({ data: null, error: err.message });
	}
};
