import express from "express";
import { addVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle, getVehicleBookings } from "../controllers/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.route("/add").post(addVehicle);
vehicleRouter.route("/getAll").get(getAllVehicles);
vehicleRouter.route("/:id").get(getVehicleById);
vehicleRouter.route("/update/:id").put(updateVehicle);
vehicleRouter.route("/delete/:id").delete(deleteVehicle);
vehicleRouter.route("/:id/bookings").get(getVehicleBookings);

export default vehicleRouter;