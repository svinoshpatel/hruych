package com.github.svinoshpatel.api.dto.Bid;

import com.github.svinoshpatel.api.dto.UserAccount.BidderRes;

public record BidRes(Long id,
                     Long amount,
                     BidderRes bidder) {
}
