import express from "express";
import * as authController from '../controllers/authController.js';
import authHandler from "../middleware/authHandler.js";

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/status', authHandler, authController.status);

export default router;

