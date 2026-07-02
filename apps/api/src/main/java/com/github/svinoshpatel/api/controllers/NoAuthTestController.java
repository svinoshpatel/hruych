package com.github.svinoshpatel.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NoAuthTestController {

    @GetMapping("/noauthtest")
    public String test() {
        return "no auth tho";
    }
}
