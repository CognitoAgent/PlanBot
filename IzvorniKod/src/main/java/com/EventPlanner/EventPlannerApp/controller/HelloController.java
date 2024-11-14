package com.EventPlanner.EventPlannerApp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("https://planbot-9s64.onrender.com/") // assuming React runs on port 3000

@RestController
public class HelloController {

	@GetMapping("/greeting")
	public String greet() {
		return "Welcome to this page";
	}
}
