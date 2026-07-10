package com.github.svinoshpatel.api.services;

import com.github.svinoshpatel.api.exceptions.FileUploadException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3ObjectOperationService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    public String uploadImage(MultipartFile file) {
        // is validation working?
        var key = "auctions/" + UUID.randomUUID();
        try {
            s3Client.putObject(req -> req
                            .bucket(bucketName)
                            .key(key)
                            .ifNoneMatch("*"),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            return key;
        } catch (IOException e) {
            throw new FileUploadException(e);
        }
    }
}
