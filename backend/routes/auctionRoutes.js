import express from 'express';
import * as auctionController from '../controllers/auctionController.js';

const router = express.Router();

router.get('/:id', auctionController.getAuctionById);
router.get('/', auctionController.getAllAuctions);

export default router;
