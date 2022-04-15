import { UserModel } from './user.model';

/**
 * @path /api/user/:id
 * @request patch
 * @desc update an existing user from mongodb
 */
export const updateUser = async (req, res) => {
	try {
		const oldUser = await UserModel.findById(req.params.id);
		const updatedUser = await UserModel.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					email: req.body.email ? req.body.email : oldUser.email,
					fullName: req.body.fullName
						? req.body.fullName
						: oldUser.fullName,
					password: req.body.password
						? req.body.password
						: oldUser.password,
				},
			},
		);
		return res.status(200).json({
			success: true,
			updatedUser,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false, message: err.message });
	}
};

/**
 * @path /api/user/:id
 * @request delete
 * @desc delete an existing user from mongodb
 */
export const deleteUser = async (req, res) => {
	try {
		const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			success: true,
			deletedUser,
		});
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false, message: err.message });
	}
};

/**
 @path /api/user/
 @request get
 @desc get all users from mongodb
 */
export const findAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		return res.status(200).json(users);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ success: false, message: err.message });
	}
};

/**
 @path /api/user/:id
 @request get
 @desc get a user by id from mongodb
 */
export const findUserById = async (req, res) => {
	try {
		const getUser = await UserModel.findById(req.params.id);
		return res.status(200).json(getUser);
	} catch (err) {
		console.error(err);
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
};
