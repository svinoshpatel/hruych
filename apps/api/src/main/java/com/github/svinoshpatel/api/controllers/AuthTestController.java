package com.github.svinoshpatel.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthTestController {

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}
