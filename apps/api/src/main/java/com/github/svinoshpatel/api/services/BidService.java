package com.github.svinoshpatel.api.services;

import com.github.svinoshpatel.api.dto.Bid.BidReq;
import com.github.svinoshpatel.api.dto.Bid.BidRes;
import com.github.svinoshpatel.api.entities.Auction;
import com.github.svinoshpatel.api.entities.Bid;
import com.github.svinoshpatel.api.entities.UserAccount;
import com.github.svinoshpatel.api.exceptions.InvalidBidAmountException;
import com.github.svinoshpatel.api.exceptions.NotFoundException;
import com.github.svinoshpatel.api.exceptions.UnauthorizedException;
import com.github.svinoshpatel.api.mappers.BidMapper;
import com.github.svinoshpatel.api.repositories.AuctionRepository;
import com.github.svinoshpatel.api.repositories.BidRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional
public class BidService {

    // TODO: I wanted to do something with auctions, do the same with bids
    private final UserAccountService userAccountService;
    private final AuctionRepository auctionRepository;
    private final BidRepository bidRepository;
    private final BidMapper bidMapper;

    public BidRes createBid(BidReq req, Jwt jwt) {
        var bidder = userAccountService.getOrCreateUserAccount(jwt);

        var auctionId = req.auctionId();
        var auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundException("Auction with id " + auctionId + " not found"));

        validateBid(req, bidder, auction);

        var bid = bidMapper.toBid(req, bidder, auction);
        var savedBid = bidRepository.save(bid);
        return bidMapper.toBidRes(savedBid);
    }

    private void validateBid(BidReq req, UserAccount bidder, Auction auction) {
        var amount = req.amount();
        var author = auction.getAuthor();

        if (bidder.equals(author)) {
            throw new UnauthorizedException("You cannot bid on your own auction");
        }

        var highestBid = auction.getBids().stream()
                .map(Bid::getAmount)
                .max(Long::compareTo).orElse(0L);

        if (amount <= highestBid + auction.getMinBidStep()) {
            throw new InvalidBidAmountException(
                    "Bid amount must be greater than the current highest bid + minimum bid step"
            );
        }

        if (amount < auction.getStartingBid()) {
            throw new InvalidBidAmountException("Bid amount must be greater than or equal to the starting bid");
        }
    }
}
