import expressRouter from "express";
import userRouter from "./userRoutes.js";
import adminRouter from "./adminRoutes.js";
import bookingRouter from "./bookingRoutes.js";
import customerRouter from "./customerRoutes.js";
import vehicleRouter from "./vehicleRoutes.js";

const router = expressRouter();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/booking", bookingRouter);
router.use("/customer", customerRouter);
router.use("/vehicle", vehicleRouter);

export default router;