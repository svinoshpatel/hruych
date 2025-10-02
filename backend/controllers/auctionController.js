import * as auctionService from '../services/auctionService.js';

export async function getAuctionById(req, res, next) {
	try {
		const auctionId = req.params.id; 		
		const auction = await auctionService.getAuctionById(auctionId);

		if (!auction)
			return res.status(404).json({ message: 'Auction not found' });	

		return res.status(200).json(auction);
	} catch (error) {
		next(error);	
	};
};

export async function getAllAuctions(req, res, next) {
	try {
		const auctions = await auctionService.getAllAuctions();	
		return res.status(200).json(auctions);
	} catch (error) {
		next(error);
	};
};
