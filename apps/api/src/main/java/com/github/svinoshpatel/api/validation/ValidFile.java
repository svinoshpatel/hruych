package com.github.svinoshpatel.api.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = FileValidator.class)
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidFile {

    String message() default "Invalid uploaded file";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    String[] allowedTypes() default {};
    boolean required() default true;
}
