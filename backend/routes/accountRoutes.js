import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.get('/:id', accountController.getAccountById);

export default router;
