import Booking from "../schemas/bookingSchema.js";
import Vehicle from "../schemas/vehicleSchema.js";
import Invoice from "../schemas/invoiceSchema.js";

/* export const createBooking = async (req, res) => {


    try {
        const { customerId, vehicleId, pickUpTime, dropTime, PaymentMethod } = req.body;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        if (!vehicle.isAvailable) {
            return res.status(400).json({ message: "Vehicle is not available" });
        }

        const pickUp = new Date(pickUpTime);
        const drop = new Date(dropTime);
        const durationInHours = Math.abs(drop - pickUp) / 36e5; 

        const totalPrice = vehicle.minCharge + (vehicle.chargePerHour * durationInHours);

        const booking = new Booking({
            customerId,
            vehicleId,
            pickUpTime,
            dropTime,
            PaymentMethod,
            bookingStatus: 'Pending', 
            paymentStatus: 'Pending',  
            totalPrice      
        });


        await booking.save();

        booking.bookingStatus = 'Success';
        await booking.save();

        vehicle.isAvailable = false;
        vehicle.status = 'booked';
        await vehicle.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
 */

export const createBooking = async (req, res) => {
    try {
        const { userId, customerId, vehicleId, pickUpTime, totalPrice, PaymentMethod } = req.body;
        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        if (!vehicle.isAvailable) {
            return res.status(400).json({ message: "Vehicle is not available" });
        }

        /* const pickUp = new Date(pickUpTime);
        const drop = new Date(dropTime);
        const durationInHours = Math.abs(drop - pickUp) / 36e5;

         if (isNaN(vehicle.minCharge) || isNaN(vehicle.chargePerHour) || isNaN(durationInHours)) {
            return res.status(400).json({ message: "Invalid vehicle charge data or duration" });
        }

        const totalPrice = vehicle.minCharge + (vehicle.chargePerHour * durationInHours); */


        const booking = new Booking({
            userId,
            customerId,
            vehicleId,
            pickUpTime,
           // dropTime,
            PaymentMethod,
            bookingStatus: 'Pending',
            paymentStatus: 'Pending',
            totalPrice
        });


        await booking.save();


        vehicle.isAvailable = false;
        vehicle.status = 'booked';
        await vehicle.save();


        booking.bookingStatus = 'In Progress';
        await booking.save();

        const { dropTime: _, ...responseBooking } = booking.toObject();

        res.status(201).json({
            message: "Booking created successfully",
            booking: responseBooking
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getAllBooking = async (req, res) => {
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

export const updateBookng = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).send('Booking Not found');
        }
        res.send(booking);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const completeBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('vehicleId');
        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        if (!booking.vehicleId) {
            return res.status(404).send('Vehicle not found');
        }

        booking.bookingStatus = 'Completed';
        booking.dropTime = new Date();

        if (booking.vehicleId) {

            booking.vehicleId.isAvailable = true;
            booking.vehicleId.status = 'available';


            await booking.vehicleId.save();
        } else {
            return res.status(404).json({ message: "Vehicle not found" });
        }


        await booking.save();

        const pickUp = new Date(booking.pickUpTime);
        const drop = new Date(booking.dropTime);
        const durationInHours = Math.abs(drop - pickUp) / 36e5;

         if (isNaN(booking.vehicleId.minCharge) || isNaN(booking.vehicleId.chargePerHour) || isNaN(durationInHours)) {
            return res.status(400).json({ message: "Invalid vehicle charge data or duration" });
        }

        const totalPrice = booking.vehicleId.minCharge + (booking.vehicleId.chargePerHour * durationInHours);
        
        const totalAmount = totalPrice
        const PaymentMethod = booking.PaymentMethod || 'Unknown';
//create Invoice
        const invoice = new Invoice({
            invoiceId: `INV-${Date.now()}`,
            userId: booking.userId,
            customerId: booking.customerId,
            bookingId: booking._id,
            vehicleId: booking.vehicleId._id,
            charges: [
                { description: 'Base Charge', amount: booking.vehicleId.minCharge },
                { description: 'Hourly Charge', amount: booking.vehicleId.chargePerHour }
            ],
            totalAmount ,
            PaymentMethod,//: booking.PaymentMethod || 'Unknown', 
            paymentStatus: booking.paymentStatus || 'Pending' 
        });

        await invoice.save();

        res.status(200).json({
            message: "Booking completed and invoice is created successfully",  
            totalAmount: totalPrice, 
            booking: booking.toObject(), invoice 
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send('booking not found');
        }

        const vehicle = await Vehicle.findById(booking.vehicle);
        vehicle.isAvailable = true;
        await vehicle.save();

        res.send({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
