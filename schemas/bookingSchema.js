import mongoose from "mongoose";
import Invoice from "../schemas/invoiceSchema.js";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
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
        enum: ['Cash', 'UPI', 'Card', 'NetBanking', 'Unknown'],
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
/* bookingSchema.pre('save', async function (next) {
    try {
        
        if (this.isModified('bookingStatus') && this.bookingStatus === 'Completed') {

            await this.populate('vehicleId');
            await this.populate('customerId');

            const vehicle = this.vehicleId;
            if (!vehicle) {
                throw new Error('Vehicle information is missing.');
            }
            //const customer = this.customerId;

            const totalAmount = this.totalPrice;
            const charges = [
                { description: 'Base Charge', amount: vehicle.minCharge },
                { description: 'Hourly Charge', amount: vehicle.chargePerHour }
            ];

            
            const invoice = new Invoice({
                invoiceId: `INV-${Date.now()}`,
                customerId: this.customerId._id,
                bookingId: this._id,
                vehicleId: vehicle._id,
                charges,
                totalAmount,
                paymentMethod: this.PaymentMethod,
                paymentStatus: this.paymentStatus
            });

           
            await invoice.save();
        }
    } catch (error) {
        console.error('Error creating invoice:', error);
        return next(error);
    }

    next();
});
 */
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;