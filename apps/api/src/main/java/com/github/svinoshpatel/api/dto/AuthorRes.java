package com.github.svinoshpatel.api.dto;

public record AuthorRes(Long id,
                        String displayName,
                        String avatarUrl,
                        String username) {
}
