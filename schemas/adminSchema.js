import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;