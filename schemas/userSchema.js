import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        }
    },
    age: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric (letters and numbers only).']

    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    }
});

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
};

const User = mongoose.model("User", userSchema);
export default User;