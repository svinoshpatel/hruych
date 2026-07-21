package com.github.svinoshpatel.api.repositories;

import com.github.svinoshpatel.api.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
