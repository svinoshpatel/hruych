package com.github.svinoshpatel.api.services;

import com.github.svinoshpatel.api.dto.CreateAuctionReq;
import com.github.svinoshpatel.api.dto.AuctionRes;
import com.github.svinoshpatel.api.dto.UpdateAuctionReq;
import com.github.svinoshpatel.api.entities.Auction;
import com.github.svinoshpatel.api.exceptions.NotFoundException;
import com.github.svinoshpatel.api.exceptions.UnauthorizedException;
import com.github.svinoshpatel.api.mappers.AuctionMapper;
import com.github.svinoshpatel.api.repositories.AuctionRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class AuctionService {

    private final UserAccountService userAccountService;
    private final AuctionRepository auctionRepository;
    private final AuctionMapper auctionMapper;
    private final S3ObjectOperationService s3ObjectOperationService;

    public AuctionRes create(CreateAuctionReq req, MultipartFile image, Jwt jwt) {
        var auction = auctionMapper.toAuction(req);

        // TODO: Maybe I also need to set auction as author's child manually or check the cascading options
        var author = userAccountService.getOrCreateUserAccount(jwt);
        auction.setAuthor(author);

        var imageKey = s3ObjectOperationService.uploadImage(image);
        auction.setImageKey(imageKey);

        auction.addTiers();

        var savedAuction = auctionRepository.save(auction);

        var timeLeft = convertDateTimeToTimeLeft(savedAuction);
        return auctionMapper.toAuctionRes(savedAuction, timeLeft);
    }

    public AuctionRes update(UpdateAuctionReq req, MultipartFile image, Jwt jwt, Long id) {
        var existingAuction = getExistingAuction(id, jwt);

        var updatedAuction = auctionMapper.updateAuction(existingAuction, req);
        if (image != null) {
           var imageKey = s3ObjectOperationService.uploadImage(image);
           updatedAuction.setImageKey(imageKey);
        }

        updatedAuction.addTiers();

        var savedAuction = auctionRepository.save(updatedAuction);

       var timeLeft = convertDateTimeToTimeLeft(savedAuction);
        return auctionMapper.toAuctionRes(savedAuction, timeLeft);
    }

    public void delete(Long id, Jwt jwt) {
        var existingAuction = getExistingAuction(id, jwt);
        auctionRepository.delete(existingAuction);
    }

    private Auction getExistingAuction(Long id, Jwt jwt) {
        var existingAuction = auctionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Auction with id " + id + " not found"));

        var jwtSub = UUID.fromString(Objects.requireNonNull(jwt.getSubject()));
        if (!existingAuction.getAuthor().getSub().equals(jwtSub)) {
            throw new UnauthorizedException("You are not authorized to update this auction");
        }

        return existingAuction;
    }

    private Duration convertDateTimeToTimeLeft(Auction auction) {
        var startTime = auction.getStartDateTime();
        var endTime = auction.getEndDateTime();
        // TODO: Maybe change timeLeft output format?
        return Duration.between(startTime, endTime);
    }
}
