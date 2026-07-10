#!/bin/bash
# Check if bucket already exists
if awslocal s3api head-bucket --bucket hruych-bucket 2>/dev/null; then
    echo "=== Bucket already exists, skipping initialization ==="
else
    echo "=== Initialization of S3 bucket ==="
    awslocal s3api create-bucket \
      --bucket hruych-bucket \
      --region eu-central-2 \
      --create-bucket-configuration LocationConstraint=eu-central-2
fi