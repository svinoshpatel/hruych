package com.github.svinoshpatel.api.dto;

import java.time.OffsetDateTime;
import java.util.List;

public record AuctionReq(
        String title,
        String description,
        String terms,
        List<TierReq> tiers,
        String imageUrl,
        OffsetDateTime startDateTime,
        OffsetDateTime endDateTime,
        Long startingBid,
        Long minBidStep) {
}
