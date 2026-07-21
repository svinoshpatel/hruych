package com.github.svinoshpatel.api.mappers;

import com.github.svinoshpatel.api.dto.Bid.BidReq;
import com.github.svinoshpatel.api.dto.Bid.BidRes;
import com.github.svinoshpatel.api.entities.Auction;
import com.github.svinoshpatel.api.entities.Bid;
import com.github.svinoshpatel.api.entities.UserAccount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BidMapper {

    @Mapping(target = "id", ignore = true)
    Bid toBid(BidReq bidReq, UserAccount bidder, Auction auction);

    BidRes toBidRes(Bid bid);
}
