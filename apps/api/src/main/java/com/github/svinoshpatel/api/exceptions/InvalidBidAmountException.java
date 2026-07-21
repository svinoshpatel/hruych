package com.github.svinoshpatel.api.exceptions;

public class InvalidBidAmountException extends RuntimeException {
    public InvalidBidAmountException(String message) {
        super(message);
    }
}
