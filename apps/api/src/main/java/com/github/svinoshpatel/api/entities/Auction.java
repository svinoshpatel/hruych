package com.github.svinoshpatel.api.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "auction")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private UserAccount author;

    @NotNull
    @Column(name = "title", nullable = false, length = Integer.MAX_VALUE)
    private String title;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @NotNull
    @Column(name = "terms", nullable = false, length = Integer.MAX_VALUE)
    private String terms;

    @NotNull
    @Column(name = "image_url", nullable = false, length = Integer.MAX_VALUE)
    private String imageUrl;

    @ColumnDefault("now()")
    @Column(name = "start_date_time")
    private OffsetDateTime startDateTime;

    @NotNull
    @Column(name = "end_date_time", nullable = false)
    private OffsetDateTime endDateTime;

    @NotNull
    @Column(name = "starting_bid", nullable = false)
    private Long startingBid;

    @NotNull
    @Column(name = "min_bid_step", nullable = false)
    private Long minBidStep;

    @OneToMany(mappedBy = "auction")
    private Set<Bid> bids = new LinkedHashSet<>();

    @OneToMany(mappedBy = "auction")
    private Set<Tier> tiers = new LinkedHashSet<>();


}