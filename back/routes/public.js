import { Router } from "express";
import usersRoutes from "../modules/users/users.routes.js";

const router = Router();

router.use("/user", usersRoutes);


export default router;