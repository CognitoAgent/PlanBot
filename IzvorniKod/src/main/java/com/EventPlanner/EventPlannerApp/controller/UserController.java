package com.EventPlanner.EventPlannerApp.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.EventPlanner.EventPlannerApp.domain.User;

import jakarta.servlet.http.HttpServletRequest;
@CrossOrigin("https://planbot-9s64.onrender.com/") // assuming React runs on port 3000

@RestController
public class UserController {
	
	private List<User> users = new ArrayList<>(List.of(
			new User((long)1, "user1", "psw1", "email1"),
			new User((long)2, "user2", "psw2", "email2"))); 

	@GetMapping("/users")
	public List<User> getUsers(){
		return users;
	}
	
	//for getting a csrf token which we can later use in postman to send a request
	@GetMapping("/csrf-token")
	public CsrfToken getCsrfToken(HttpServletRequest request) {
		return (CsrfToken)request.getAttribute("_csrf");
	}
	
	@PostMapping("/users")
	public User addUser(@RequestBody User user) {
		users.add(user);
		return user;
	}
	
	
}
