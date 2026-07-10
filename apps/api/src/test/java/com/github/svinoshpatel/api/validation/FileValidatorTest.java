package com.github.svinoshpatel.api.validation;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FileValidatorTest {

    @Mock
    private MultipartFile file;

    @Mock
    private ValidFile constraintAnnotation;

    @InjectMocks
    private FileValidator fileValidator;

    @BeforeEach
    void setUp() {
        when(constraintAnnotation.allowedTypes()).thenReturn(new String[]{
                "image/jpeg", "image/png", "image/webp"
        });

        fileValidator.initialize(constraintAnnotation);
    }

    @Test
    void shouldReturnFalseWhenFileIsEmpty() {
        when(file.isEmpty()).thenReturn(true);

        var res = fileValidator.isValid(file, null);

        assertFalse(res);
    }

    @Test
    void shouldReturnTrueWhenRealJpegIsAllowed() {
        byte[] jpegBytes = new byte[] {
                (byte) 0xFF, (byte) 0xD8, (byte) 0xFF, (byte) 0xE0, 0x00, 0x10,
                0x4A, 0x46, 0x49, 0x46, 0x00, 0x01
        };

        MultipartFile file = new MockMultipartFile(
                "file",
                "photo.jpg",
                "image/jpeg",
                jpegBytes
        );

        var res = fileValidator.isValid(file, null);

        assertTrue(res);
    }
}
