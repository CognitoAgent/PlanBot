package com.EventPlanner.EventPlannerApp.controller;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.EventPlanner.EventPlannerApp.dto.*;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com") // assuming React runs on port 3000
@RestController
public class UserLoginController {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private UserService service;

	@Autowired
	private PostService postService;

	@PostMapping("/register")
	public String register(@RequestBody User user) {
		return service.register(user);
		// we want to store this in database -> we need a service layer(UserService)

	}

	@PostMapping("/login")
	public String login(@RequestBody User user) {
		System.out.println("Pokusavamo login ovog usera");
		System.out.println(user);

		// asking service layer to verify it
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

	@PostMapping("/acceptstatus")
	public ResponseEntity<String> updateAcceptStatus(@RequestBody AcceptStatusRequest request) {
		try {
			// Get the current logged-in user
			String username = service.getCurrentUsername();
			User user = userRepo.findByUsername(username);

			if (user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
			}

			// Fetch the event by its ID
			Optional<Post> postOptional = postRepo.findById(request.getId());
			if (postOptional.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
			}

			Post post = postOptional.get();

			if (request.isAccepted()) {
				// Add the user to the "joinedBy" list if accepting
				if (!post.getJoinedBy().contains(user)) {
					post.getJoinedBy().add(user);
				}
			} else {
				// Remove the user from the "joinedBy" list if cancelling
				post.getJoinedBy().remove(user);
			}

			// Save the updated post
			postRepo.save(post);

			return ResponseEntity.ok("Status updated successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating status: " + e.getMessage());
		}
	}

	@PostMapping("/events/attending")
	public ResponseEntity<List<Post>> getUserAttendingEvents() {
		// Fetch the current username from security context
		String username = service.getCurrentUsername();

		if (username == null) {
			return ResponseEntity.status(401).build(); // Unauthorized
		}

		// Use UserRepo to fetch the user
		User currentUser = service.getUserByUsername(username);

		if (currentUser == null) {
			return ResponseEntity.status(404).build(); // User not found
		}

		// Retrieve the list of events the user is attending
		List<Post> attendingPosts = currentUser.getJoinedPosts();

		// Return the list as a response
		return ResponseEntity.ok(attendingPosts);

	}

}
