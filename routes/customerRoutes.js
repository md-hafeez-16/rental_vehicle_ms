import express from "express";
import { createCustomer, getAllCustomer, getCustomerById, updateCustomer, deleteCustomer } from "../controllers/customerController.js";

const customerRouter = express.Router();

customerRouter.route("/add").post(createCustomer);
customerRouter.route("/getAll").get(getAllCustomer);
customerRouter.route("/:id").get(getCustomerById);
customerRouter.route("/update/:id").put(updateCustomer);
customerRouter.route("/delete/:id").delete(deleteCustomer);


export default customerRouter;