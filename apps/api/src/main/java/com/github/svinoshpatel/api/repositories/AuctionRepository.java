package com.github.svinoshpatel.api.repositories;

import com.github.svinoshpatel.api.entities.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    // TODO: implement sorting
    Page<Auction> findAllByOrderByEndDateTimeAsc(Pageable pageable);
}
