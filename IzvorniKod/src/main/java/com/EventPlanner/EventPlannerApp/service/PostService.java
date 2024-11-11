package com.EventPlanner.EventPlannerApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;

@Service
public class PostService {
	
	@Autowired
	private PostRepo repo;

	public Post createPost(Post post) {
		return repo.save(post);
	}
	
	public String deletePost(Long postId) {
        repo.deleteById(postId);
        return "Post has been deleted";
    }
}
