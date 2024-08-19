import express from "express";
import { createAdmin, getAllAdmin, getAdminById, updateAdmin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.route("/add").post(createAdmin);
adminRouter.route("/getAll").get(getAllAdmin);
adminRouter.route("/getby/:id").get(getAdminById);
adminRouter.route("/update/:id").put(updateAdmin);



export default adminRouter;