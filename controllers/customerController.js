import Customer from "../schemas/customerSchema.js";
import User from "../schemas/userSchema.js";

export const createCustomer = async (req, res) => {
    try {
        const user = new User(req.body.user);
        await user.save();

        const customer = new Customer({ ...req.body, User: user._id });
        await customer.save();

        res.status(201).send(customer);

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


