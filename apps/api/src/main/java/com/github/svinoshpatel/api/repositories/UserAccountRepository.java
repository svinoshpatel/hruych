package com.github.svinoshpatel.api.repositories;

import com.github.svinoshpatel.api.entities.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    Optional<UserAccount> findBySub(UUID sub);
}
