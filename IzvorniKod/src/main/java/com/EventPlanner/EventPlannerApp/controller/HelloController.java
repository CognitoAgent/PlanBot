package com.EventPlanner.EventPlannerApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/greeting")
	public String greet() {
		return "Welcome to this page";
	}
}
