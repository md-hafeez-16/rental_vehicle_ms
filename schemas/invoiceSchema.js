import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    charges: [{
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        //required: true
    },
    PaymentMethod: {
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'NetBanking', 'Unknown'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

/*  invoiceSchema.pre('save', async function (next) {
    
    await this.populate('bookingId');
    await this.populate('vehicleId');

    const booking = this.bookingId;
    const vehicle = this.vehicleId;

    
    this.PaymentMethod = booking.PaymentMethod;


    this.totalAmount = booking.totalPrice; 

    
    this.charges = [
        { description: 'Base Charge', amount: vehicle.minCharge },
        { description: 'Hourly Charge', amount: vehicle.chargePerHour }
        
    ];

    next();
}); 
 */
/* invoiceSchema.pre('save', async function (next) {
    // Populate references
    await this.populate('bookingId');
    await this.populate('vehicleId');

    const booking = this.bookingId;
    const vehicle = this.vehicleId;

    // Calculate totalAmount based on charges and duration
    if (booking && vehicle) {
        const pickUp = new Date(booking.pickUpTime);
        const drop = new Date(booking.dropTime);
        const durationInHours = Math.abs(drop - pickUp) / 36e5;

        // Check for valid charges
        if (!isNaN(vehicle.minCharge) && !isNaN(vehicle.chargePerHour) && !isNaN(durationInHours)) {
            const baseCharge = vehicle.minCharge;
            const hourlyCharge = vehicle.chargePerHour * durationInHours;
            this.totalAmount = baseCharge + hourlyCharge;

            this.charges = [
                { description: 'Base Charge', amount: baseCharge },
                { description: 'Hourly Charge', amount: hourlyCharge }
            ];
        } else {
            this.totalAmount = 0;
            this.charges = [];
        }

        // Set PaymentMethod
        this.PaymentMethod = booking.PaymentMethod || 'Unknown';
    }

    next();
});
 */

invoiceSchema.pre('save', async function (next) {
    await this.populate('bookingId');
    await this.populate('vehicleId');

    const booking = this.bookingId;
    const vehicle = this.vehicleId;

    this.PaymentMethod = booking.PaymentMethod;
    this.totalAmount = booking.totalPrice; // Ensure this is correctly calculated and set

    this.charges = [
        { description: 'Base Charge', amount: vehicle.minCharge },
        { description: 'Hourly Charge', amount: vehicle.chargePerHour }
    ];

    next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
