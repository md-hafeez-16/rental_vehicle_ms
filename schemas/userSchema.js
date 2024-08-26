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
        required: true,
        min: [18, 'Age should not be less than 18']
    },

    mobileNumber: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Mobile number must start with 6 or above and be exactly 10 digits long'],
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must be at least 8 characters long and should be alpha numeric.']
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