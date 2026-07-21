package com.github.svinoshpatel.api.services;

import com.github.svinoshpatel.api.dto.Auction.AuctionPageRes;
import com.github.svinoshpatel.api.dto.Auction.CreateAuctionReq;
import com.github.svinoshpatel.api.dto.Auction.AuctionRes;
import com.github.svinoshpatel.api.dto.Auction.UpdateAuctionReq;
import com.github.svinoshpatel.api.entities.Auction;
import com.github.svinoshpatel.api.exceptions.NotFoundException;
import com.github.svinoshpatel.api.exceptions.UnauthorizedException;
import com.github.svinoshpatel.api.mappers.AuctionMapper;
import com.github.svinoshpatel.api.repositories.AuctionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.OffsetDateTime;
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
        var existingAuction = getCurrentUserExistingAuction(id, jwt);

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
        var existingAuction = getCurrentUserExistingAuction(id, jwt);
        auctionRepository.delete(existingAuction);
    }

    public AuctionRes getById(Long id) {
        var auction = getExistingAuction(id);
        var timeLeft = convertDateTimeToTimeLeft(auction);
        return auctionMapper.toAuctionRes(auction, timeLeft);
    }

    public AuctionPageRes getAll(int page, int size) {
        var pageable = PageRequest.of(page, size);

        var auctionPage = auctionRepository.findAllByOrderByEndDateTimeAsc(pageable);

        var auctionListRes = auctionMapper.toAuctionResList(auctionPage.getContent());

        // TODO: not sure that i really need page data to be like that in my implementation
        return new AuctionPageRes(auctionListRes, page, size, (int) auctionPage.getTotalPages());
    }

    private Auction getCurrentUserExistingAuction(Long id, Jwt jwt) {
        var existingAuction = getExistingAuction(id);

        var jwtSub = UUID.fromString(Objects.requireNonNull(jwt.getSubject()));
        if (!existingAuction.getAuthor().getSub().equals(jwtSub)) {
            throw new UnauthorizedException("You are not authorized to update this auction");
        }

        return existingAuction;
    }

    private Auction getExistingAuction(Long id) {
        return auctionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Auction with id " + id + " not found"));
    }

    private Duration convertDateTimeToTimeLeft(Auction auction) {
        var currentTime = OffsetDateTime.now();
        var endTime = auction.getEndDateTime();
        // TODO: Maybe change timeLeft output format?
        return Duration.between(currentTime, endTime);
    }
}
