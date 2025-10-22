import express from 'express';
import * as auctionController from '../controllers/auctionController.js';
import authHandler from '../middleware/authHandler.js';

const router = express.Router();

router.get('/:id', auctionController.getAuctionById);
router.get('/', auctionController.getAllAuctions);

router.post('/', authHandler, auctionController.createAuction);

export default router;
