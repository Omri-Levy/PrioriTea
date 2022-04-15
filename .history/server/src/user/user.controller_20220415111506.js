/**
 * @path /api/user/:id
 * @request patch
 * @desc update an existing user from mongodb
 */
export const updateUser = async (req, res) => {
	try {
		const oldUser = await User.findById(req.params.id);
		const updatedUser = await User.updateOne(
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
		return res.status(200).json({ updatedUser });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 * @path /api/user/:id
 * @request delete
 * @desc delete an existing user from mongodb
 */
export const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		return res.status(200).json({ deletedUser });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 @path /api/user/
 @request get
 @desc get all users from mongodb
 */
export const findAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};

/**
 @path /api/user/:id
 @request get
 @desc get a user by id from mongodb
 */
export const findUserById = async (req, res) => {
	try {
		const getUser = await User.findById(req.params.id);
		return res.status(200).json(getUser);
	} catch (err) {
		console.error(err);
		return res.status(400).json({ message: err });
	}
};
