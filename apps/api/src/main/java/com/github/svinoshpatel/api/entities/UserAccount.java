package com.github.svinoshpatel.api.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "user_account", uniqueConstraints = {@UniqueConstraint(name = "user_account_sub_key",
        columnNames = {"sub"})})
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "sub", nullable = false)
    private UUID sub;

    @Column(name = "avatar_key", length = Integer.MAX_VALUE)
    private String avatarKey;

    @NotNull
    @Column(name = "display_name", nullable = false, length = Integer.MAX_VALUE)
    private String displayName;

    @Column(name = "bio", length = Integer.MAX_VALUE)
    private String bio;

    @NotNull
    @Column(name = "reputation", nullable = false)
    private Integer reputation;

    @NotNull
    @Column(name = "followers_count")
    private Integer followersCount;

    @ColumnDefault("false")
    @Column(name = "is_followed")
    private Boolean isFollowed;

    @NotNull
    @Column(name = "username")
    private String username;

    @OneToMany(mappedBy = "author")
    private Set<Auction> auctions = new LinkedHashSet<>();


}