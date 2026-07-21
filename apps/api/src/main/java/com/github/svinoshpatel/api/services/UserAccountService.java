package com.github.svinoshpatel.api.services;

import com.github.svinoshpatel.api.entities.UserAccount;
import com.github.svinoshpatel.api.repositories.UserAccountRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public UserAccount getOrCreateUserAccount(Jwt jwt) {
        var sub = UUID.fromString(Objects.requireNonNull(jwt.getSubject()));

        return userAccountRepository.findBySub(sub)
                .orElseGet(() -> {
                    var newUser = new UserAccount();
                    newUser.setSub(sub);
                    newUser.setReputation(0);
                    newUser.setFollowersCount(0);

                    var username = jwt.getClaimAsString("username");
                    newUser.setDisplayName(username);
                    newUser.setUsername(username);
                    return userAccountRepository.save(newUser);
                });
    }
}
