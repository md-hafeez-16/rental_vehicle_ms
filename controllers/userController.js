import User from "../schemas/userSchema.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.send(user)

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('user Not found');
        }
        res.send(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await user.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message);
    }
};