package com.github.svinoshpatel.api.dto.Auction;

import com.github.svinoshpatel.api.dto.UserAccount.AuthorRes;
import com.github.svinoshpatel.api.dto.Bid.BidRes;
import com.github.svinoshpatel.api.dto.Tier.TierRes;

public record AuctionRes(
        Long id,
        AuthorRes author,
        String title,
        String description,
        String terms,
        TierRes[] tiers,
        String imageKey,
        String timeLeft,
        BidRes[] bids,
        Long startingBid,
        Long minBidStep) {
}
