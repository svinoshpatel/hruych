import express from 'express';
import authHandler from '../middleware/authHandler.js';
import * as accountController from '../controllers/accountController.js';
import * as auctionController from '../controllers/auctionController.js';

const router = express.Router();

router.get('/me', authHandler, accountController.getSelfProfile);
router.get('/me/auction', auctionController.getSelfAuctions);
router.get('/:id', accountController.getAccountById);
router.get('/:id/auction', auctionController.getAuctionsByAccountId);

export default router;
