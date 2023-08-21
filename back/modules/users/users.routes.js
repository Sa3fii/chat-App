import { Router } from 'express';
import controllers from './users.controllers.js';

const router = Router()

router.post('/signin',  controllers.signIn);

router.get('',  controllers.getUsers);

// router.post('/user',  controllers.signIn);






export default router;