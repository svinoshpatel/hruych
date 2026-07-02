package com.github.svinoshpatel.api.mappers;

import com.github.svinoshpatel.api.dto.AuctionReq;
import com.github.svinoshpatel.api.entities.Auction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuctionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bids", ignore = true)
    @Mapping(target = "author", ignore = true)
    Auction toAuction(AuctionReq auctionReq);
}
