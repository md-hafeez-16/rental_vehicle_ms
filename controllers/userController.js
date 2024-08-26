import User from "../schemas/userSchema.js";

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({ user });

    } catch (error) {
        res.status(400).json(error.message);
    }
};

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

/* export const getAllUserWithPagination = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const sortField = req.query.sortField || "firstName";
      const sortOrder = req.query.sortOrder || "asc";
      const sort = {};
      sort[sortField] = sortOrder === "asc" ? 1 : -1;
      const startIndex = (page - 1) * pageSize;
      const totalDocuments = await User.countDocuments();
      const totalPages = Math.ceil(totalDocuments / pageSize);
  
      const admin = await User.find({})
        .sort(sort)
        .skip(startIndex)
        .limit(pageSize)
        .populate("userId")
        .exec();
  
      return res.status(200).json({
        admin,
        pagination: {
          page,
          pageSize,
          totalPages,
          totalDocuments,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message, success: false });
    }
  }; 
 */