import Invoice from '../schemas/invoiceSchema.js';
import Booking from '../schemas/bookingSchema.js';
import Vehicle from '../schemas/vehicleSchema.js';

/* export const createInvoice = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId)
            .populate('vehicleId')
            .populate('customerId')
            .populate('userId'); 

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        //console.log('Booking:', booking);

        const vehicle = booking.vehicleId;
        const customer = booking.customerId;
        const user = booking.userId;
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const totalAmount = booking.totalPrice || 0;
        const PaymentMethod = booking.PaymentMethod || 'Unknown';

        const charges = [
            { description: 'Base Charge', amount: vehicle.minCharge },
            { description: 'Hourly Charge', amount: vehicle.chargePerHour }
        ];

        const invoice = new Invoice({
            invoiceId: `INV-${Date.now()}`,
            userId: user._id, 
            customerId: customer._id,
            bookingId: booking._id,
            vehicleId: vehicle._id,
            charges,
            totalAmount,
            PaymentMethod, 
            paymentStatus: booking.paymentStatus 
        });

        await invoice.save();

        res.status(201).json({ message: 'Invoice created successfully', invoice, totalAmount });
    } catch (error) {
        console.error('Error creating invoice:', error); // Log the error
        res.status(500).json({ message: 'Error creating invoice', error: error.message });
    }
}; */

export const createInvoice = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId)
            .populate('vehicleId')
            .populate('customerId')
            .populate('userId');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const vehicle = booking.vehicleId;
        const customer = booking.customerId;
        //const user = booking.userId;

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const totalAmount = booking.totalPrice || 0;
        const PaymentMethod = booking.PaymentMethod || 'Unknown';

        const charges = [
            { description: 'Base Charge', amount: vehicle.minCharge },
            { description: 'Hourly Charge', amount: vehicle.chargePerHour }
        ];

        const invoice = new Invoice({
            invoiceId: `INV-${Date.now()}`,
            userId: booking.userId,
            customerId: customer._id,
            bookingId: booking._id,
            vehicleId: vehicle._id,
            charges,
            totalAmount: booking.totalPrice,
            PaymentMethod,
            paymentStatus: booking.paymentStatus
        });

        await invoice.save();

        res.status(201).json({ message: 'Invoice created successfully', invoice, totalAmount });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Error creating invoice', error: error.message });
    }
};

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate('userId')
            .populate('customerId')
            .populate('bookingId')
            .populate('vehicleId');

        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error); // Log the error
        res.status(500).json({ message: 'Error fetching invoices', error: error.message });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id)
            .populate('userId')
            .populate('customerId')
            .populate('bookingId')
            .populate('vehicleId');

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error); // Log the error
        res.status(500).json({ message: 'Error fetching invoice', error: error.message });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;

        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        invoice.paymentStatus = paymentStatus;
        invoice.updatedAt = Date.now();

        await invoice.save();

        res.status(200).json({ message: 'Payment status updated successfully', invoice });
    } catch (error) {
        console.error('Error updating payment status:', error); // Log the error
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findByIdAndDelete(id);

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error); // Log the error
        res.status(500).json({ message: 'Error deleting invoice', error: error.message });
    }
};
