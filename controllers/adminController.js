import Admin from "../schemas/adminSchema.js";
import User from "../schemas/userSchema.js";
import Booking from "../schemas/bookingSchema.js";
import Vehicle from "../schemas/vehicleSchema.js";
import Customer from "../schemas/customerSchema.js";
import asyncHandler from "express-async-handler";

export const createAdmin = async (req, res) => {
    try {
        const user = new User(req.body.user);
        await user.save();

        const admin = new Admin({ ...req.body, user: user._id });
        await admin.save();

        res.status(201).json({ admin, user });

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

        res.status(200).json({ admin });

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

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('vehicleId customerId');
        res.send(bookings)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('vehicleId customerId');
        if (!booking) {
            return res.status(404).send('Booking not found');
        }
        res.send(booking)

    } catch (error) {
        res.status(500).send(error.message);
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

export const getAllCustomer = async (req, res) => {
    try {
        const customers = await Customer.find().populate('userId');
        res.send(customers)
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('userId');
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.send(customer)

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.send(vehicles);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle Not Found');
        }
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getCustomerBookings = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send('Customer not found');
        }

        const bookings = await Booking.find({ customerId: req.params.id }).populate('vehicleId');

        res.send(bookings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getVehicleBookings = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }

        const bookings = await Booking.find({ vehicleId: req.params.id });//.populate('vehicleId');

        res.send(bookings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

 export const getAllAdminWithPagination = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const sortField = req.query.sortField || "firstName";
      const sortOrder = req.query.sortOrder || "asc";
      const sort = {};
      sort[sortField] = sortOrder === "asc" ? 1 : -1;
      const startIndex = (page - 1) * pageSize;
      const totalDocuments = await Admin.countDocuments();
      const totalPages = Math.ceil(totalDocuments / pageSize);
  
      const admin = await Admin.find({})
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


