import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();
//userRouter.route("/add").post(createUser);
userRouter.route("/getAll").get(getAllUsers);
userRouter.route("/:id").get(getUserById);
userRouter.route("/update/:id").put(updateUser);
userRouter.route("/delete/:id").delete(deleteUser);

export default userRouter;