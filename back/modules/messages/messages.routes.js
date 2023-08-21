import { Router } from 'express';
import controllers from './messages.controllers.js';

const router = Router()

router.get('',  controllers.getMessages);

router.post('',  controllers.addMessage);

export default router;