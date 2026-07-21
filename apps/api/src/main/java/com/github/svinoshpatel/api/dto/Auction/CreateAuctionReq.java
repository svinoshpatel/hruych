package com.github.svinoshpatel.api.dto.Auction;

import com.github.svinoshpatel.api.dto.Tier.CreateTierReq;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

public record CreateAuctionReq(
        @NotBlank String title, // TODO: Maybe I should implement content size constraint here
        String description,
        @NotBlank String terms,

        @Valid List<CreateTierReq> tiers,

        OffsetDateTime startDateTime,
        @NotNull OffsetDateTime endDateTime,

        @NotNull @Min(100) Long startingBid,
        @NotNull @Min(100) Long minBidStep) {
}
