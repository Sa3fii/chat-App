import { Router } from "express";
import privateRoutes from './private.js'
import publicRoutes from './public.js'

const router = Router();

router.use("/", privateRoutes);
router.use("/", publicRoutes);


export default router;