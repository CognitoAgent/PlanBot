package com.EventPlanner.EventPlannerApp.controller;

import java.lang.reflect.Array;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.SystemPropertyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.SuggestionRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;

import io.jsonwebtoken.lang.Arrays;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com") // assuming React runs on port 3000
@RestController
public class AdminController {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private SuggestionRepo suggestionRepo;

	@Autowired
	private UserService service;

	@Autowired
	private PostService postService;
	
	private String[] adminNames = {"ana", "user1"};
	
	@GetMapping("/admin")
	public ResponseEntity<?> checkIfAdmin() {
		if(!Arrays.asList(adminNames).contains(service.getCurrentUsername())){
    		System.out.println("Korisnik nije admin, nema pristup");
        	return ResponseEntity.status(400).build();
    		}
		return ResponseEntity.ok("Korisnik je admin");	
		}
	
	
	
	@PostMapping("/admin")
	public ResponseEntity<List<?>> getEventOrUserList(@RequestBody String selected) {
	    System.out.println("Dobiveni selected " + selected);
	    try {
	    	
	        if(selected.contains("Events")){
	        	List<Post> allPosts = postService.getPosts();
	        	if (allPosts.isEmpty()) {
		            System.out.println("No posts found.");
		            return ResponseEntity.ok(Collections.emptyList());
		        }else {
		        	System.out.println("Iz baze smo dobili "+allPosts.size()+" objava");
		        }
	        	
	        	List<fakePost> allFakePosts = new LinkedList<>();
	            for (Post p : allPosts) {
	            	fakePost fp = new fakePost(p.getId(), p.getTitle(), p.getDate(), p.getLocation(),
	                		p.getDescription(), p.getPicture(), p.getPublishedBy().getUsername(), p.getComments(),
	                		p.getSuggestions());
	            	allFakePosts.add(fp);
	            }
	            System.out.println("Vracamo allFakePosts listu");
	            return ResponseEntity.ok(allFakePosts);
	        	
	        }else if(selected.contains("Users")) {
	        	List<User> allUsers = service.getUsers();
	        	if (allUsers.isEmpty()) {
		            System.out.println("No users found.");
		            return ResponseEntity.ok(Collections.emptyList());
		        }else {
		        	System.out.println("Iz baze smo dobili "+allUsers.size()+" usera");
		        }
	        	
	        	List<fakeUser> allFakeUsers = new LinkedList<>();
	        	for(User s: allUsers) {
	        		fakeUser fu = new fakeUser(s.getId(), s.getUsername(), s.getEmailAddress());
	        		allFakeUsers.add(fu);
	        	}
	        	System.out.println("Vracamo allFakeUsers listu");
	            return ResponseEntity.ok(allFakeUsers);
	        	
	        }
	        
        	System.out.println("Dobiveni selected nije ni Events ni Users, vracamo ");
        	return ResponseEntity.badRequest().build();
	        
	
	    } catch (Exception e) {
	        System.out.println("Ispis error 500 iz getEventOrUserList metode");
	        return ResponseEntity.status(500).build();
	    }
	}
	
	@PostMapping("/adminUser")
	public ResponseEntity<String> adminDeleteUserBtn(@RequestBody String textId){

		System.out.println("Pokrenuta adminDeleteUserBtn metoda");
		try {
			System.out.println("Dobiveni textId="+textId);
			Long id = Long.parseLong(textId);
			
			User user = service.getUserById(id);
			if(user==null) {
				System.out.println("Korisnik nije pronaden u bazi");
	            return ResponseEntity.badRequest().build();
			}
			service.deleteUser(id);
			return ResponseEntity.ok("Korisnik je izbrisan");
				
			
		} catch (Exception e) {
	        System.out.println("Ispis error 500 iz adminDeleteUserBtn metode");
	        return ResponseEntity.status(500).build();
	    }
	}
	
	@PostMapping("/adminPost")
	public ResponseEntity<String> adminDeletePostBtn(@RequestBody String textId){

		System.out.println("Pokrenuta adminDeletePostBtn metoda");
		try {
			System.out.println("Dobiveni textId="+textId);
			Long id = Long.parseLong(textId);
			
			Post post = postService.getPostById(id);
			if(post.getPublishedBy()==service.getCurrentUser()) {
				System.out.println("Brisemo objavu "+post.getId());
				postService.deletePost(post.getId());
				return ResponseEntity.ok("Objava uspjesno obrisana");//tu bi sad trebalo refreshati stranicu??
				
			}else {
				System.out.println("Objava nije uspjela obrisati");
				return ResponseEntity.badRequest().build();
			}
				
			
		} catch (Exception e) {
	        System.out.println("Ispis error 500 iz adminDeletePostBtn metode");
	        return ResponseEntity.status(500).build();
	    }
	}
}
