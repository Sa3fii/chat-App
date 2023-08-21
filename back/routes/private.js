import { Router } from "express";
import messagesRoutes from '../modules/messages/messages.routes.js'
import usersRoutes from "../modules/users/users.routes.js";
const router = Router();

router.use("/message", messagesRoutes);
router.use("/user", usersRoutes);


export default router;