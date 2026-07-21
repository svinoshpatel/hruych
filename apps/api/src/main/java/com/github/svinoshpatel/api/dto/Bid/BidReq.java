package com.github.svinoshpatel.api.dto.Bid;

import jakarta.validation.constraints.NotNull;

public record BidReq(@NotNull Long amount, Long auctionId) {
}
