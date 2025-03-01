package com.EventPlanner.EventPlannerApp.controller;

import java.sql.Date;


import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;

import jakarta.servlet.http.HttpSession;

import com.EventPlanner.EventPlannerApp.dto.*;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;

import com.google.api.client.json.gson.GsonFactory;


@CrossOrigin(origins = "https://planbot-9s64.onrender.com", allowCredentials = "true") // assuming React runs on port 3000
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
	
	//OAuth2.0
	//https://developers.google.com/identity/protocols/oauth2
	//(const token = credentialResponse.credential) <= from front
	
	public static GoogleIdToken.Payload autentificate(String idTokenString) {
		String CLIENT_ID = "387225362184-crecu7ml71o5gfdld19qn96v2epqh2tv.apps.googleusercontent.com";
		NetHttpTransport transport = new NetHttpTransport();
	    GsonFactory jsonFactory = new GsonFactory();

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            //sending token to Google
            GoogleIdToken idToken = verifier.verify(idTokenString);
			//returning verified token and user's info
            if (idToken == null) {
                return null;
	        }
	            return idToken.getPayload();
       } catch (Exception e) {
	            return null;
       }

	    
	}
	
	
	@PostMapping("/gAuth")
	public ResponseEntity<?> gAuthLogin(@RequestBody String tokenId, HttpSession session) {
		if (tokenId.startsWith("\"") && tokenId.endsWith("\"")) {//if token starts/ends with ", remove
		     tokenId = tokenId.substring(1, tokenId.length() - 1);
		  }
		  
		GoogleIdToken.Payload payload = autentificate(tokenId);

		if (payload == null) {
			return new ResponseEntity<>("Neuspješna autentifikacija", HttpStatus.UNAUTHORIZED); // 401
		}

		//getting user's data
		String userId = payload.getSubject();
		String userName = payload.get("given_name").toString();
		String userEmail = payload.getEmail();

		Boolean userExists = false;
		try {
			Long id = Long.parseLong(userId);
			if(service.getUserById(id) !=null) {
				userExists = true;
			}
		}catch(Exception e) {
			System.out.println("Dobili userId koji ne mozemo parsirati u Long");
			return ResponseEntity.badRequest().build();
		}
		
		User user = null;
		if(userExists) {//if user already exists in database
			user = service.getUserById(Long.parseLong(userId));
		}else {
			//create new user
			user = new User(Long.parseLong(userId), userName, null, userEmail);
			userRepo.save(user);
		}

		login(user);
		  
		return ResponseEntity.ok("User successfully logged in!");
	}
	//OAuth2.0

	public String getCurrentUsername() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
			return ((UserDetails) principal).getUsername();
		}
		return principal.toString(); // In case the principal is not a UserDetails instance
	}

	@PostMapping("/AdminPanel")//creating and storing a post by current user
	public String createEvent(@RequestBody Post post) {
		System.out.println("createEvent funkc");
		System.out.println(post.toString());
		// Set the current user's ID as the publishedBy field
		User s = new User();
		s.setId(service.getCurrentUserId());
		System.out.println(s);
		post.setPublishedBy(s);
		System.out.println("Kreiranje objave");
		return postService.createPost(post).toString();
	}

	@PostMapping("/changeevent")//changing post by current user
    public ResponseEntity<String> updatePost(@RequestBody Post updatedPost) throws Throwable{
        try {
            // Get the currently logged-in user's ID
            Long userId = service.getCurrentUserId();

            if (userId == null) {
                return ResponseEntity.status(403).body("Unauthorized access");
            }

            // Find the post to be updated
            Optional<Post> postOptional = postRepo.findById(updatedPost.getId());
			Post post = postOptional.orElseThrow(() -> new IllegalArgumentException("Post not found"));

            // Check if the user is the creator of the post
            if (!post.getPublishedBy().getId().equals(userId)) {
                return ResponseEntity.status(403).body("You can only update posts you created");
            }

            // Update the post details (event details)
            post.setTitle(updatedPost.getTitle());
            post.setDate(updatedPost.getDate());
            post.setLocation(updatedPost.getLocation());
            post.setDescription(updatedPost.getDescription());

            // Save the updated post
            postRepo.save(post);

            return ResponseEntity.ok("Post updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the post");
        }
    }
	
	/*
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
	*/
	
	
	@PatchMapping("/joinPost")//user wants to attend the event -> add to joinedBy list
	@Transactional
	public ResponseEntity<String> joinPostBtn(@RequestBody Post post){
		try {
			if(postRepo.existsById(post.getId())) {
				
				List<User> joined = post.getJoinedBy();
				if(!joined.contains(service.getCurrentUser())) {
					joined.add(service.getCurrentUser());
					System.out.println("Dodali trenutnog usera u listu joinedBy");
					postRepo.save(post);
					System.out.println("Saveali objavu");
					return ResponseEntity.ok("Korisnik uspjesno dodan");
				}else {
					return ResponseEntity.ok("Korisnik je vec dodan");
				}
			}
			System.out.println("U bazi se ne nalazi objava, joinPostBtn metoda");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trazena objava nije pronadena, joinPostBtn metoda");
		}catch (Exception e) {
	        System.out.println("Ispis error 500 iz joinPostBtn metode");
	        return ResponseEntity.status(500).build();
	    }
	}

	

	
	
}
