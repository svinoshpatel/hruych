package com.github.svinoshpatel.api.dto;

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
