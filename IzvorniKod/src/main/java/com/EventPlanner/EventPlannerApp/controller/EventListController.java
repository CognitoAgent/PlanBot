package com.EventPlanner.EventPlannerApp.controller;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;

import com.EventPlanner.EventPlannerApp.controller.fakePost;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com") // assuming React runs on port 3000
@RestController
public class EventListController {
	

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private UserService service;

	@Autowired
	private PostService postService;
	
	
	@PostMapping("/eventlist")
	public ResponseEntity<List<fakePost>> getEventList(@RequestBody String selected) {
	    System.out.println("Dobiveni selected " + selected);
	    try {
	        Long userId = service.getCurrentUserId();
	        System.out.println("Dobiveni userId " + userId);

	        if (userId == null) {
	            return ResponseEntity.status(403).build(); // Unauthorized access
	        }

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
            System.out.println("Kreirali allFakePosts listu, ima "+allFakePosts.size()+" objava");

	        if (selected.trim().contains("My events")) {
	            //System.out.println("Selected je jednak My events");
	            List<fakePost> myFakePosts = new LinkedList<>();
	            System.out.println("Trebamo samo objave korisnika; radimo myFakePosts listu");
	            for (fakePost p : allFakePosts) {
	                if (p.getPublishedBy().equals(service.getCurrentUsername())) {
	                    myFakePosts.add(p);
	                }
	            }
	            System.out.println("myFakePosts ima "+myFakePosts.size()+" objava, to su sljedece");
	            for(fakePost p: myFakePosts) {
	            	System.out.println(p.toString());
	            }
	            
	            return ResponseEntity.ok(myFakePosts);
	        } else if (selected.trim().contains("Other events")) {
	        	System.out.println("Saljemo allFakePosts listu koja ima "
	        						+allFakePosts.size()+" objava za prikaz");
	            return ResponseEntity.ok(allFakePosts);
	        } else {
	            return ResponseEntity.badRequest().build();
	        }
	    } catch (Exception e) {
	        System.out.println("Ispis error 500 iz getEventList metode");
	        return ResponseEntity.status(500).build();
	    }
	}
	
}
