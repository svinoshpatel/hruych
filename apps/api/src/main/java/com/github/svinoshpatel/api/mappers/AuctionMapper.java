package com.github.svinoshpatel.api.mappers;

import com.github.svinoshpatel.api.dto.CreateAuctionReq;
import com.github.svinoshpatel.api.dto.AuctionRes;
import com.github.svinoshpatel.api.dto.UpdateAuctionReq;
import com.github.svinoshpatel.api.entities.Auction;
import org.mapstruct.*;

import java.time.Duration;

@Mapper(componentModel = "spring")
public interface AuctionMapper {

    @Mapping(target = "imageKey", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bids", ignore = true)
    @Mapping(target = "author", ignore = true)
    Auction toAuction(CreateAuctionReq auctionReq);

    AuctionRes toAuctionRes(Auction auction, Duration timeLeft);

    @Mapping(target = "imageKey", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bids", ignore = true)
    @Mapping(target = "author", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Auction updateAuction(@MappingTarget Auction auction, UpdateAuctionReq auctionReq);
}
