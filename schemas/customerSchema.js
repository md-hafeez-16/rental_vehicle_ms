import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Aadhar number must be exactly 12 digits']
    },
    panCard: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Z]{5}\d{4}[A-Z]$/, 'PAN card must have 10 characters: 5 alphabets, 4 numbers, and 1 alphabet']
    },
    DL: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Z]{2}\d{2}\s?\d{4}\d{7}$/, 'Driving License must follow the RTO format, e.g., KA25 20210000000']
    }
});

/* customerSchema.pre('save', function(next) {
    if (!/^\d{12}$/.test(this.aadharNumber)) {
        return next(new Error('Aadhar number must be exactly 12 digits.'));
    }
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(this.panCard)) {
        return next(new Error('PAN card must have 10 characters: 5 alphabets, 4 numbers, and 1 alphabet.'));
    }
    next();
}); */

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;