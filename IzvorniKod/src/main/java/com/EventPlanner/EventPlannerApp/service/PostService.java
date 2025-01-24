package com.EventPlanner.EventPlannerApp.service;

import java.sql.Date;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Optionals;
import org.springframework.stereotype.Service;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;

@Service
public class PostService {
	
	@Autowired
	private PostRepo repo;
	
	@Autowired
    public PostService(PostRepo postRepo) {
        this.repo = postRepo;
    }
	
	public Post createPost(Post post) {
        return repo.save(post);
    }

	
	public String deletePost(Long postId) {
        repo.deleteById(postId);
        return "Post has been deleted";
    }

	
	public List<Post> getPosts() {
	    try {
	        System.out.println("getPosts metoda pozvana, dohvacamo sve objave:");
	        List<Post> posts = repo.findAll();
	        if (posts.isEmpty()) {
	            System.out.println("Nema objava");
	            return Collections.emptyList();
	        }
	        for (Post p : posts) {
	            System.out.println(p);
	        }
	        System.out.println("Kraj dohvacanja svih objava");
	        return posts;
	    } catch (Exception e) {
	        System.err.println("Error in getPosts: " + e.getMessage());
	        return Collections.emptyList();
	    }
	}
	
	public List<Post> getPostsByPublishedBy(User user){//moze vratiti NULL!!!
		List<Post> posts = repo.findByPublishedBy(user);
		if(posts.isEmpty()) {
			System.out.println("Nema objava za zadanog korisnika");
			return null;
		}
		return posts;
	}
	
	public Post getPostById(Long id) {
		Optional optionalPost = repo.findById(id);
		if(optionalPost.isPresent()) {
			return (Post)optionalPost.get();
		}
		return null;
	}
}