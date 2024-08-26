import Customer from "../schemas/customerSchema.js";
import User from "../schemas/userSchema.js";
import Booking from "../schemas/bookingSchema.js";

export const createCustomer = async (req, res) => {
    try {
        const user = new User(req.body.user);
        await user.save();

        const customer = new Customer({ ...req.body, User: user._id });
        await customer.save();

        res.status(201).json({ customer, user });

    } catch (error) {
        res.status(400).json(error.message);
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

export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).send('Customer Not found');
        }
        res.send(customer);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.send(customer)
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

/* export const getAllCustomerWithPagination = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const sortField = req.query.sortField || "firstName";
      const sortOrder = req.query.sortOrder || "asc";
      const sort = {};
      sort[sortField] = sortOrder === "asc" ? 1 : -1;
      const startIndex = (page - 1) * pageSize;
      const totalDocuments = await Customer.countDocuments();
      const totalPages = Math.ceil(totalDocuments / pageSize);
  
      const customer = await Customer.find({})
        .sort(sort)
        .skip(startIndex)
        .limit(pageSize)
        .populate("userId")
        .exec();
  
      return res.status(200).json({
        customer,
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
  };  */

