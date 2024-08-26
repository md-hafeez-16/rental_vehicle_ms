import express from "express";
import {
     createAdmin, getAllAdmin, getAdminById, updateAdmin, getAllBookings, getAllUsers, getBookingById,
     getUserById, getAllCustomer, getCustomerById, getAllVehicles, getVehicleById, getCustomerBookings,
     getVehicleBookings, getAllAdminWithPagination
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.route("/add").post(createAdmin);
adminRouter.route("/getAll").get(getAllAdmin);
adminRouter.route("/getby/:id").get(getAdminById);
adminRouter.route("/update/:id").put(updateAdmin);
adminRouter.route("/:id/bookings").get(getCustomerBookings);
adminRouter.route("/vehicles/:id/bookings").get(getVehicleBookings);

adminRouter.route("/getAllBookings").get(getAllBookings);
adminRouter.route("/getBooking/:id").get(getBookingById);


adminRouter.route("/getAllUsers").get(getAllUsers);
adminRouter.route("/getUser/:id").get(getUserById);


adminRouter.route("/getAllCustomers").get(getAllCustomer);
adminRouter.route("/getCustomer/:id").get(getCustomerById);


adminRouter.route("/getAllVehicles").get(getAllVehicles);
adminRouter.route("/getVehicle/:id").get(getVehicleById);

adminRouter.route("/getAllWithPagination").get(getAllAdminWithPagination);

export default adminRouter;