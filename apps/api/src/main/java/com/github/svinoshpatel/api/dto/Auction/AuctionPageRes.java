package com.github.svinoshpatel.api.dto.Auction;

import java.util.List;

public record AuctionPageRes(List<AuctionRes> data, // TODO: Refactor because should not return every auction field
                             int page,
                             int size,
                             int total) {
}
