import express from 'express';
import * as accountController from '../controllers/accountController.js';
import * as auctionController from '../controllers/auctionController.js';

const router = express.Router();

router.get('/:id', accountController.getAccountById);
router.get('/:id/auction', auctionController.getAuctionsByAccountId);

export default router;
