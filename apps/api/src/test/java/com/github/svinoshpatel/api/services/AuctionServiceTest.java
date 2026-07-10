package com.github.svinoshpatel.api.services;

import com.github.svinoshpatel.api.dto.*;
import com.github.svinoshpatel.api.entities.Auction;
import com.github.svinoshpatel.api.entities.Tier;
import com.github.svinoshpatel.api.entities.UserAccount;
import com.github.svinoshpatel.api.mappers.AuctionMapper;
import com.github.svinoshpatel.api.repositories.AuctionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.same;
import static org.mockito.Mockito.*;

// TODO: Refactor all tests here, because i dont like them and cant read them
@ExtendWith(MockitoExtension.class)
public class AuctionServiceTest {

    @Mock
    private AuctionRepository auctionRepository;

    @Mock
    private S3ObjectOperationService s3ObjectOperationService;

    @Mock
    private AuctionMapper auctionMapper;

    @Mock
    private UserAccountService userAccountService;

    @Mock
    private MultipartFile image;

    @Mock
    private Jwt jwt;

    @InjectMocks
    private AuctionService auctionService;

    @Test
    void create_shouldCreateAuction() {
        var startDateTime = OffsetDateTime.parse("2026-07-10T10:00:00Z");
        var endDateTime = OffsetDateTime.parse("2026-07-17T10:00:00Z");

        var req = new CreateAuctionReq(
                "Test auction",
                "Test description",
                "Test terms",
                List.of(new CreateTierReq("Tier 1", 100L)),
                startDateTime,
                endDateTime,
                100L,
                100L
        );

        var auction = new Auction();
        auction.setTitle(req.title());
        auction.setDescription(req.description());
        auction.setTerms(req.terms());
        auction.setStartDateTime(req.startDateTime());
        auction.setEndDateTime(req.endDateTime());
        auction.setStartingBid(req.startingBid());
        auction.setMinBidStep(req.minBidStep());

        var tier = new Tier();
        tier.setTitle("Tier 1");
        tier.setPrice(100L);
        auction.setTiers(new LinkedHashSet<>(List.of(tier)));

        var author = new UserAccount();
        var imageKey = "auctions/test-image.jpg"; // actually not true data

        //noinspection UnnecessaryLocalVariable
        var savedAuction = auction;
        savedAuction.setId(1L);

        var expectedTimeLeft = Duration.between(startDateTime, endDateTime);
        var expectedRes = new AuctionRes(
                1L,
                null,
                "Test auction",
                "Test description",
                "Test terms",
                null,
                imageKey,
                "7 days",
                null,
                100L,
                100L
        );

        when(auctionMapper.toAuction(req)).thenReturn(auction);
        when(userAccountService.getOrCreateUserAccount(jwt)).thenReturn(author);
        when(s3ObjectOperationService.uploadImage(image)).thenReturn(imageKey);
        when(auctionRepository.save(auction)).thenReturn(savedAuction);
        when(auctionMapper.toAuctionRes(savedAuction, expectedTimeLeft)).thenReturn(expectedRes);

        var actualRes = auctionService.create(req, image, jwt);

        assertThat(actualRes).isSameAs(expectedRes);
        assertThat(auction.getAuthor()).isSameAs(author);
        assertThat(auction.getImageKey()).isEqualTo(imageKey);
        assertThat(tier.getAuction()).isSameAs(auction);

        verify(auctionMapper).toAuction(req);
        verify(userAccountService).getOrCreateUserAccount(jwt);
        verify(s3ObjectOperationService).uploadImage(image);
        verify(auctionRepository).save(same(auction));
        verify(auctionMapper).toAuctionRes(savedAuction, expectedTimeLeft);
    }

    @Test
    void update_shouldUpdateAuctionWithoutImage() {
        var auctionId = 1L;
        var authorSub = UUID.randomUUID();
        var startDateTime = OffsetDateTime.parse("2026-07-10T10:00:00Z");
        var endDateTime = OffsetDateTime.parse("2026-07-17T10:00:00Z");
        var existingImageKey = "auctions/existing-image.webp";

        var req = new UpdateAuctionReq(
                "Updated auction",
                "Updated description",
                "Updated terms",
                List.of(new UpdateTierReq("Updated tier", 200L)),
                startDateTime,
                endDateTime,
                200L,
                100L
        );

        var author = new UserAccount();
        author.setSub(authorSub);

        var existingAuction = new Auction();
        existingAuction.setId(auctionId);
        existingAuction.setAuthor(author);
        existingAuction.setImageKey(existingImageKey);

        var updatedAuction = new Auction();
        updatedAuction.setId(auctionId);
        updatedAuction.setAuthor(author);
        updatedAuction.setTitle(req.title());
        updatedAuction.setDescription(req.description());
        updatedAuction.setTerms(req.terms());
        updatedAuction.setImageKey(existingImageKey);
        updatedAuction.setStartDateTime(req.startDateTime());
        updatedAuction.setEndDateTime(req.endDateTime());
        updatedAuction.setStartingBid(req.startingBid());
        updatedAuction.setMinBidStep(req.minBidStep());

        var updatedTier = new Tier();
        updatedTier.setTitle("Updated tier");
        updatedTier.setPrice(200L);
        updatedAuction.setTiers(new LinkedHashSet<>(List.of(updatedTier)));

        var expectedTimeLeft = Duration.between(startDateTime, endDateTime);
        var expectedRes = new AuctionRes(
                auctionId,
                null,
                "Updated auction",
                "Updated description",
                "Updated terms",
                null,
                existingImageKey,
                "7 days",
                null,
                200L,
                100L
        );

        when(jwt.getSubject()).thenReturn(authorSub.toString());
        when(auctionRepository.findById(auctionId)).thenReturn(Optional.of(existingAuction));
        when(auctionMapper.updateAuction(existingAuction, req)).thenReturn(updatedAuction);
        when(auctionRepository.save(updatedAuction)).thenReturn(updatedAuction);
        when(auctionMapper.toAuctionRes(updatedAuction, expectedTimeLeft)).thenReturn(expectedRes);

        var actualRes = auctionService.update(req, null, jwt, auctionId);

        assertThat(actualRes).isSameAs(expectedRes);
        assertThat(updatedAuction.getImageKey()).isEqualTo(existingImageKey);
        assertThat(updatedTier.getAuction()).isSameAs(updatedAuction);

        verify(auctionRepository).findById(auctionId);
        verify(auctionMapper).updateAuction(existingAuction, req);
        verifyNoInteractions(s3ObjectOperationService);
        verify(auctionRepository).save(same(updatedAuction));
        verify(auctionMapper).toAuctionRes(updatedAuction, expectedTimeLeft);
    }

    @Test
    void update_shouldUpdateAuctionWithImage() {
        var auctionId = 1L;
        var authorSub = UUID.randomUUID();
        var startDateTime = OffsetDateTime.parse("2026-07-10T10:00:00Z");
        var endDateTime = OffsetDateTime.parse("2026-07-17T10:00:00Z");
        var existingImageKey = "auctions/existing-image.webp";
        var newImageKey = "auctions/new-image.webp";

        var req = new UpdateAuctionReq(
                "Updated auction",
                "Updated description",
                "Updated terms",
                List.of(new UpdateTierReq("Updated tier", 200L)),
                startDateTime,
                endDateTime,
                200L,
                100L
        );

        var author = new UserAccount();
        author.setSub(authorSub);

        var existingAuction = new Auction();
        existingAuction.setId(auctionId);
        existingAuction.setAuthor(author);
        existingAuction.setImageKey(existingImageKey);

        var updatedAuction = new Auction();
        updatedAuction.setId(auctionId);
        updatedAuction.setAuthor(author);
        updatedAuction.setTitle(req.title());
        updatedAuction.setDescription(req.description());
        updatedAuction.setTerms(req.terms());
        updatedAuction.setImageKey(existingImageKey);
        updatedAuction.setStartDateTime(req.startDateTime());
        updatedAuction.setEndDateTime(req.endDateTime());
        updatedAuction.setStartingBid(req.startingBid());
        updatedAuction.setMinBidStep(req.minBidStep());

        var updatedTier = new Tier();
        updatedTier.setTitle("Updated tier");
        updatedTier.setPrice(200L);
        updatedAuction.setTiers(new LinkedHashSet<>(List.of(updatedTier)));

        var expectedTimeLeft = Duration.between(startDateTime, endDateTime);
        var expectedRes = new AuctionRes(
                auctionId,
                null,
                "Updated auction",
                "Updated description",
                "Updated terms",
                null,
                existingImageKey,
                "7 days",
                null,
                200L,
                100L
        );

        when(jwt.getSubject()).thenReturn(authorSub.toString());
        when(auctionRepository.findById(auctionId)).thenReturn(Optional.of(existingAuction));
        when(auctionMapper.updateAuction(existingAuction, req)).thenReturn(updatedAuction);
        when(auctionRepository.save(updatedAuction)).thenReturn(updatedAuction);
        when(auctionMapper.toAuctionRes(updatedAuction, expectedTimeLeft)).thenReturn(expectedRes);
        when(s3ObjectOperationService.uploadImage(image)).thenReturn(newImageKey);

        var actualRes = auctionService.update(req, image, jwt, auctionId);

        assertThat(actualRes).isSameAs(expectedRes);
        assertThat(updatedAuction.getImageKey()).isEqualTo(newImageKey);
        assertThat(updatedTier.getAuction()).isSameAs(updatedAuction);

        verify(auctionRepository).findById(auctionId);
        verify(auctionMapper).updateAuction(existingAuction, req);
        verify(s3ObjectOperationService).uploadImage(image);
        verify(auctionRepository).save(same(updatedAuction));
        verify(auctionMapper).toAuctionRes(updatedAuction, expectedTimeLeft);

    }

    @Test
    void update_shouldThrowNotFoundExceptionWhenAuctionDoesNotExist() {
        // ...
    }

    @Test
    void update_shouldThrowUnauthorizedExceptionWhenUserIsNotAuthor() {
        // ...
    }
}
