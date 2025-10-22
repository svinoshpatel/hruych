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

export async function getAuctionsByAccountId(req, res, next) {
	try {
		const accountId = req.params.id;
		const auctions = await auctionService.getAuctionsByAccountId(accountId);
		return res.status(200).json(auctions);
	} catch (error) {
		next(error);
	};
};

export async function getSelfAuctions(req, res, next) {
	try {
		const accountId = req.accountId;
		const auctions = await auctionService.getAuctionsByAccountId(accountId);
		return res.status(200).json(auctions);
	} catch (error) {
		next(error);
	};
};

export async function createAuction(req, res, next) {
	try {
		const accountId = req.accountId;
		const {
			title, description, image, startingBid, minBidStep, isAutobuy,
			autobuyPrice, startTime, duration 
		} = req.body;
		const auction = await auctionService.createAuction(
			title, description, image, startingBid, minBidStep, isAutobuy,
			autobuyPrice, startTime, duration, accountId
		);

		return res.status(201).json(`Auction created: ${auction}`);
	} catch (err) {
		next(err);
	};
};
