import Admin from "../schemas/adminSchema.js";
import User from "../schemas/userSchema.js";

export const createAdmin = async (req, res) => {
    try {
        const user = new User(req.body.user);
        await user.save();

        const admin = new Admin({ ...req.body, user: user._id });
        await admin.save();

        res.status(201).send(admin);

    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.find().populate('userId');
        res.send(admins)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).populate('userId');
        if (!admin) {
            return res.status(400).send('admin not found');
        }
        res.send(admin)

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admin) {
            return res.status(400).send('admin Not found');
        }
        res.send(admin);

    } catch (error) {
        res.status(500).send(error.message);
    }
};



