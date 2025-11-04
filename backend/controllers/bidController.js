import * as bidService from '../services/bidService.js';

export async function getAllAuctionBids(req, res, next) {
	try {
		const auctionId = req.params.id;
		const bids = await bidService.getAllAuctionBids(auctionId);
		return res.status(200).json(bids);
	} catch (err) {
		next(err);
	};
};

export async function createBid(req, res, next) {
	try {
		const { auctionId, accountId, price } = req.body;
		const bid = await bidService.createBid(auctionId, accountId, price);

		return res.status(201).json(`Bid made: ${bid}`);
	} catch (err) {
		next(err);
	}
};
