package com.EventPlanner.EventPlannerApp.controller;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.EventPlanner.EventPlannerApp.domain.Comment;
import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.Suggestion;
import com.EventPlanner.EventPlannerApp.repo.CommentRepo;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;
import com.EventPlanner.EventPlannerApp.repo.SuggestionRepo;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;
import com.EventPlanner.EventPlannerApp.service.PostService;
import com.EventPlanner.EventPlannerApp.service.UserService;

import jakarta.transaction.Transactional;

@CrossOrigin(origins = "https://planbot-9s64.onrender.com") // assuming React runs on port 3000
@RestController
public class PropositionsController {
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
	
	@Autowired
	private CommentRepo commentRepo;
	
	@PostMapping("/showPropositionsComments")//show all suggestions and comments for post with textId
    public ResponseEntity<List<?>> showPropositionsComments(@RequestBody String textId){
		try {
			Post post = postService.getPostById(Long.parseLong(textId));
			if(post==null) {
				System.out.println("Objava ne postoji u bazi");
				return ResponseEntity.badRequest().build();
				
			}
			
			List<Suggestion> ss = post.getSuggestions();
			List<Comment> cms = post.getComments();
			
			List<Object> ls = new LinkedList<>();//adding suggestions and comments in one list
			ls.add(ss);
			ls.add(cms);
			return ResponseEntity.ok(ls);//sending that list to front
		}catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@Transactional
	@PostMapping("/addcomment")//adding pWithComment.description as a comment to post with pWithComment.id
    public ResponseEntity<String> addComment(@RequestBody Post pWithComment) throws Throwable{
        try {
        	System.out.println("Pozvana addComment metoda");
        	System.out.println("Dobiveni pWithComment: "+pWithComment);
            // Get the currently logged-in user's ID
            Long userId = service.getCurrentUserId();

            if (userId == null) {
                return ResponseEntity.status(403).body("Unauthorized access");
            }

            // Find the post to be updated
            Optional<Post> optionalPost = postRepo.findById(pWithComment.getId());
            if (optionalPost.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
			}
            Post post = optionalPost.get();

            Comment com = new Comment(pWithComment.getDescription());
            commentRepo.save(com);
            post.getComments().add(com);
            
            // Save the updated post
            postRepo.save(post);

            return ResponseEntity.ok("Post updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
	}
}
