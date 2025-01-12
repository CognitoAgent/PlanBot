package com.EventPlanner.EventPlannerApp.controller;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com") // assuming React runs on port 3000
@RestController
public class PublishedEventsController {
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private UserService service;

	@Autowired
	private PostService postService;
	
	@PostMapping("/publishedevents")
	public ResponseEntity<Object> getPublishedEvents(){
		System.out.println("getPublishedEvents metoda");
	    try {
	        Long userId = service.getCurrentUserId();
	        System.out.println("Dobiveni userId " + userId);

	        if (userId == null) {
	            return ResponseEntity.status(403).build(); // Unauthorized access
	        }

	        List<Post> allPosts = postService.getPosts();
	        if (allPosts.isEmpty()) {
	            System.out.println("No posts found.");
	            return ResponseEntity.ok(Collections.emptyList());//sto onda???
	        }else {
	        	System.out.println("Iz baze smo dobili "+allPosts.size()+" objava");
	        }
	        
	        System.out.println("Trebamo samo objave korisnika; radimo myFakePosts listu");
	        List<fakePost> myFakePosts = new LinkedList<>();
            for (Post p : allPosts) {
            	if(p.getPublishedBy()==service.getCurrentUser()) {
            		fakePost fp = new fakePost(p.getId(), p.getTitle(), p.getDate(), p.getLocation(),
                    		p.getDescription(), p.getPicture(), p.getPublishedBy().getUsername(), p.getComments(),
                    		p.getSuggestions());
            		
            		myFakePosts.add(fp);
            	}
            	                
            }
            System.out.println("Kreirali myFakePosts listu, ima "+myFakePosts.size()+" objava");

	        System.out.println("To su sljedece");
	            for(fakePost p: myFakePosts) {
	            	System.out.println(p.toString());
	            }
	            
	        return ResponseEntity.ok(myFakePosts);
	        //samo nez sto ce biti ako je myFakePosts prazan ????
	    } catch (Exception e) {
	        System.out.println("Ispis error 500 iz getPublishedEvents metode");
	        return ResponseEntity.status(500).build();
	    }
	}

}
