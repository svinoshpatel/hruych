import express from 'express';
import auctionRoutes from './auctionRoutes.js';
import accountRoutes from './accountRoutes.js';

const router = express.Router();

router.use('/auction', auctionRoutes);
router.use('/account', accountRoutes);

export default router;
