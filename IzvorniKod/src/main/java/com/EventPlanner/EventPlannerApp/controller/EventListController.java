package com.EventPlanner.EventPlannerApp.controller;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.Suggestion;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.SuggestionRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;
import com.EventPlanner.EventPlannerApp.service.CommentService;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;

import jakarta.transaction.Transactional;

import com.EventPlanner.EventPlannerApp.domain.Comment;
import com.EventPlanner.EventPlannerApp.repo.CommentRepo;

import com.EventPlanner.EventPlannerApp.controller.fakePost;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com") // assuming React runs on port 3000
@RestController
public class EventListController {
	

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private SuggestionRepo suggestionRepo;

	@Autowired
	private CommentRepo commentRepo;

	@Autowired
	private CommentService commentService;

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

	        

	        if (selected.trim().contains("Accepted events")) {
	            //System.out.println("Selected je jednak My events");
	            List<fakePost> joinedFakePosts = new LinkedList<>();
	            System.out.println("Trebamo samo objave koje je korisnik prihvatio; "
	            			+ "radimo joinedFakePosts listu");
	            for (Post p : allPosts) {
	                if (p.getJoinedBy().contains(service.getCurrentUser())) {
	                	fakePost fp = new fakePost(p.getId(), p.getTitle(), p.getDate(),
	                			p.getLocation(), p.getDescription(), p.getPicture(),
	                			p.getPublishedBy().getUsername(), p.getComments(), p.getSuggestions());
	                	joinedFakePosts.add(fp);
	                    
	                }
	            }
	            System.out.println("joinedFakePosts ima "+joinedFakePosts.size()+" objava, to su sljedece");
	            for(fakePost p: joinedFakePosts) {
	            	System.out.println(p.toString());
	            }
	            
	            return ResponseEntity.ok(joinedFakePosts);
	        } else if (selected.trim().contains("All events")) {
	        	List<fakePost> allFakePosts = new LinkedList<>();
	            for (Post p : allPosts) {
	            	fakePost fp = new fakePost(p.getId(), p.getTitle(), p.getDate(), p.getLocation(),
	                		p.getDescription(), p.getPicture(), p.getPublishedBy().getUsername(), p.getComments(),
	                		p.getSuggestions());
	                
	                
	                if(p.getJoinedBy().contains(service.getCurrentUser())) {
	                	fp.setAccepted(true);
	                }
	                allFakePosts.add(fp);
	            }
	            

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
	
	@PostMapping("/proposechange")
    public ResponseEntity<String> proposeBtn(@RequestBody Post proposal) throws Throwable{
        try {
            // Get the currently logged-in user's ID
            Long userId = service.getCurrentUserId();

            if (userId == null) {
                return ResponseEntity.status(403).body("Unauthorized access");
            }

            // Find the post to be updated
            Optional<Post> optionalPost = postRepo.findById(proposal.getId());
            if (optionalPost.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found");
			}
            Post post = optionalPost.get();

            Suggestion s = new Suggestion(proposal.getDate(), proposal.getLocation());
            suggestionRepo.save(s);
            post.getSuggestions().add(s);
            
            // Save the updated post
            postRepo.save(post);

            return ResponseEntity.ok("Post updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }//try/catch
	}
	
	
	
}


