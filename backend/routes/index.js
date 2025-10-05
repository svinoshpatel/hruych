import express from 'express';
import auctionRoutes from './auctionRoutes.js';
import accountRoutes from './accountRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/auction', auctionRoutes);
router.use('/account', accountRoutes);
router.use('/auth', authRoutes);

export default router;
