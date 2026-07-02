package com.github.svinoshpatel.api.controllers;

import com.github.svinoshpatel.api.dto.AuctionReq;
import com.github.svinoshpatel.api.mappers.AuctionMapper;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/auctions")
public class AuctionController {

    private final AuctionMapper auctionMapper;

    @PostMapping
    public void create(@RequestBody AuctionReq req) {
        var auction = auctionMapper.toAuction(req);
    }
}
