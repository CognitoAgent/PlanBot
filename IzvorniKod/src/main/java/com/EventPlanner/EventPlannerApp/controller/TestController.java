package com.EventPlanner.EventPlannerApp.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretAccessKey}")
    private String secretKey;
    
    @Value("${google.maps.api.key}")
    private String gMapsKey;

    @GetMapping("/test")
    public String test() {
        return "Access Key: " + accessKeyId + ", Secret Key: " + secretKey+ "\nG Maps Key: "+gMapsKey;
    }
}
