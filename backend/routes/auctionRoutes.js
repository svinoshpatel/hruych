import express from 'express';
import * as auctionController from '../controllers/auctionController.js';
import * as bidController from '../controllers/bidController.js';
import authHandler from '../middleware/authHandler.js';
import { upload } from '../middleware/uploadHandler.js';

const router = express.Router();

router.get('/:id', auctionController.getAuctionById);
router.get('/', auctionController.getAllAuctions);
router.get('/:id/bid', bidController.getAllAuctionBids);

router.post(
	'/', authHandler, upload.single('image'), auctionController.createAuction
);
router.post('/:id/bid', authHandler, bidController.createBid);

export default router;
