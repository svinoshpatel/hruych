package com.github.svinoshpatel.api.dto;

public record BidRes(Long id,
                     Long amount,
                     BidderRes bidder) {
}
