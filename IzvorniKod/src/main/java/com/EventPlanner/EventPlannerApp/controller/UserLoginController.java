package com.EventPlanner.EventPlannerApp.controller;

import java.sql.Date;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;
@CrossOrigin("https://planbot-9s64.onrender.com/") // assuming React runs on port 3000
@RestController
public class UserLoginController{
	
	@Autowired
	private UserService service;
	
	@Autowired
	private PostService postService;

	@PostMapping("/register")
	public String register(@RequestBody User user) {
		return service.register(user);
		//we want to store this in database -> we need a service layer(UserService)
		
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user) {
		System.out.println(user);
		
		//asking service layer to verify it
		return service.verify(user);
	}
	
	public String getCurrentUsername() {
	    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    if (principal instanceof UserDetails) {
	        return ((UserDetails) principal).getUsername();
	    } 
	    return principal.toString(); // In case the principal is not a UserDetails instance
	}

	
	@PostMapping("/AdminPanel")
	public String createEvent(@RequestBody Post post) {
		System.out.println("createEvent funkc");
		System.out.println(post.toString());
	    // Set the current user's ID as the publishedBy field
		User s = new User();
		s.setId(service.getCurrentUserId());
		System.out.println(s);
	    post.setPublishedBy(s);
	    postService.createPost(post);
	    return "Post kreiran";
	}
}
