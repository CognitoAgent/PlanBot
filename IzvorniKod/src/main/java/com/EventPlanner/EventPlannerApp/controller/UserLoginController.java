package com.EventPlanner.EventPlannerApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.service.UserService;
@CrossOrigin(origins = "http://localhost:3000") // assuming React runs on port 3000
@RestController
public class UserLoginController {
	
	@Autowired
	private UserService service;

	@PostMapping("/register")
	public User register(@RequestBody User user) {
		return service.register(user);
		//we want to store this in database -> we need a service layer(UserService)
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user) {
		//System.out.println(user);
		
		//asking service layer to verify it
		return service.verify(user);
	}
}
