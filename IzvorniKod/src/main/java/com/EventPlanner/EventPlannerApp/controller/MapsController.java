package com.EventPlanner.EventPlannerApp.controller;

import java.util.HashMap;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com")
@RestController
public class MapsController {
    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;

    @GetMapping("/api/maps-key")
    public ResponseEntity<Map<String, String>> getMapsApiKey() {
        if (googleMapsApiKey == null || googleMapsApiKey.isEmpty()) {
            return ResponseEntity.status(500).body(null);
        }
        Map<String, String> response = new HashMap<>();
        response.put("apiKey", googleMapsApiKey);
        return ResponseEntity.ok(response);
    }
}
