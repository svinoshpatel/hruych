package com.github.svinoshpatel.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UpdateTierReq(
        @Pattern(regexp = ".*\\S.*", message = "must not be blank")
        String title,

        @Min(100)
        Long price
) {
}
