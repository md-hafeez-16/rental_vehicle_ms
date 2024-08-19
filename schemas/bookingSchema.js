import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },

    pickUpTime: {
        type: Date,
        default: Date.now
    },

    dropTime: {
        type: Date,
        default: Date.now
        
    },

    totalPrice: {
        type: Number,
       
    },

    PaymentMethod: {
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'NetBanking'],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    bookingStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Failed'],
        default: 'Pending'
    }
});

 /* bookingSchema.pre('save', async function (next) {

    await this.populate('vehicleId')
    const vehicle = this.vehicleId;

    this.totalPrice = vehicle.minCharge + vehicle.chargePerHour;
    next();
});  */

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;