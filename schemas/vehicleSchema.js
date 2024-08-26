import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicle: {
        type: {
            type: String,
            enum: ['bike', 'car', 'scooter'],
            required: true
        },
        numberOfSeats: {
            type: Number,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'Electric']
        }
    },
    rtoNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, 'RTO number must follow the format XX00XX0000']
    },
    status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },

    minCharge: {
        type: Number,
        required: true
    },
    chargePerHour: {
        type: Number,
        required: true
    }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;