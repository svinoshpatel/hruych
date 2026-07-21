package com.github.svinoshpatel.api.dto.UserAccount;

import com.github.svinoshpatel.api.dto.Auction.AuctionPageRes;

public record UserAccountRes(String displayName,
                             String username,
                             String bio,
                             String reputation,
                             String followersCount,
                             // TODO: Auction list should be paginated tho? How to implement that here?
                             AuctionPageRes auctions) {
}
