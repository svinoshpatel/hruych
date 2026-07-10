package com.github.svinoshpatel.api.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

public class FileValidator implements ConstraintValidator<ValidFile, MultipartFile> {

    private final Tika tika = new Tika();
    private Set<String> allowedTypes;
    private boolean required;

    @Override
    public void initialize(ValidFile constraintAnnotation) {
        this.allowedTypes = Set.of(constraintAnnotation.allowedTypes());
        this.required = constraintAnnotation.required();
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file.isEmpty() && required) {
            return false;
        }

        try {
            String detectedType = tika.detect(file.getInputStream());

            return allowedTypes.contains(detectedType);
        } catch (IOException e) {
            return false;
        }
    }
}
