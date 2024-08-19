import express from "express";
import { createBooking, getAllBooking, getBookingById, updateBookng, completeBooking, deleteBooking } from "../controllers/bookingController.js";


const bookingRouter = express.Router();

bookingRouter.route("/add").post(createBooking);
bookingRouter.route("/getAll").get(getAllBooking);
bookingRouter.route("/:id").get(getBookingById);
bookingRouter.route("/update/:id").put(updateBookng);
bookingRouter.route("/complete/:id").put(completeBooking);
bookingRouter.route("/delete/:id").delete(deleteBooking);


export default bookingRouter;