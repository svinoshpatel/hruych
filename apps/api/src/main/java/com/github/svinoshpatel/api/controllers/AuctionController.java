package com.github.svinoshpatel.api.controllers;

import com.github.svinoshpatel.api.dto.Auction.AuctionPageRes;
import com.github.svinoshpatel.api.dto.Auction.CreateAuctionReq;
import com.github.svinoshpatel.api.dto.Auction.AuctionRes;
import com.github.svinoshpatel.api.dto.Auction.UpdateAuctionReq;
import com.github.svinoshpatel.api.services.AuctionService;
import com.github.svinoshpatel.api.validation.ValidFile;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@AllArgsConstructor
@RequestMapping("/auctions")
public class AuctionController {

    private final AuctionService auctionService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AuctionRes> create(
            @Valid @RequestPart("data") CreateAuctionReq data,

            @ValidFile(allowedTypes = {"image/png", "image/jpeg", "image/webp"})
            @RequestPart("image") MultipartFile image,

            @AuthenticationPrincipal Jwt jwt) {
        var res = auctionService.create(data, image, jwt);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(res.id())
                .toUri();

        return ResponseEntity.created(location).body(res);
    }

    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, path = "/{id}")
    public ResponseEntity<AuctionRes> update(
            @Valid @RequestPart("data") UpdateAuctionReq data,

            @ValidFile(allowedTypes = {"image/png", "image/jpeg", "image/webp"}, required = false)
            @RequestPart(value = "image", required = false)
            MultipartFile image,

            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id) {
        var res = auctionService.update(data, image, jwt, id);

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete
            (@PathVariable Long id,
             @AuthenticationPrincipal Jwt jwt) {
        auctionService.delete(id, jwt);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionRes> getById(@PathVariable Long id) {
        var auction = auctionService.getById(id);

        return ResponseEntity.ok(auction);
    }

    // TODO: Implement parametrized sorting (maybe)
    @GetMapping
    public ResponseEntity<AuctionPageRes> getAll(@RequestParam int page,
                                                 @RequestParam int size) {
        var auctions = auctionService.getAll(page, size);

        return ResponseEntity.ok(auctions);
    }
}
