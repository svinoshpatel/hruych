package com.github.svinoshpatel.api.controllers;

import com.github.svinoshpatel.api.dto.Bid.BidReq;
import com.github.svinoshpatel.api.dto.Bid.BidRes;
import com.github.svinoshpatel.api.services.BidService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class BidController {

    private final BidService bidService;

    @MessageMapping("create-bid")
    @SendTo("/topic/bids")
    public BidRes createBid(@Valid BidReq req, @AuthenticationPrincipal Jwt jwt) {
        return bidService.createBid(req, jwt);
    }
}
