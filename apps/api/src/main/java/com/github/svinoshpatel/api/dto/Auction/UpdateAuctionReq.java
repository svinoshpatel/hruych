package com.github.svinoshpatel.api.dto.Auction;

import com.github.svinoshpatel.api.dto.Tier.UpdateTierReq;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

import java.time.OffsetDateTime;
import java.util.List;

public record UpdateAuctionReq(
        @Pattern(regexp = ".*\\S.*", message = "must not be blank")
        String title, // TODO: Maybe I should implement content size constraint here

        String description,

        @Pattern(regexp = ".*\\S.*", message = "must not be blank")
        String terms,

        @Valid List<UpdateTierReq> tiers,

        OffsetDateTime startDateTime,
        OffsetDateTime endDateTime,

        @Min(100) Long startingBid,
        @Min(100) Long minBidStep) {
}
