package com.github.svinoshpatel.api.repositories;

import com.github.svinoshpatel.api.entities.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
}
