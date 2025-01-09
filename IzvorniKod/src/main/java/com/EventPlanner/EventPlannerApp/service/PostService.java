package com.EventPlanner.EventPlannerApp.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EventPlanner.EventPlannerApp.domain.Post;
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
	
	public List<Post> getPosts(){
		System.out.println("getPosts metoda pozvana, dohvacamo sve objave:");
		if(repo.findAll().isEmpty()) {
			System.out.println("Nema objava");
			return null;
		}
		List<Post> l = repo.findAll();
		for(Post p: l) {
			System.out.println(p);
		}
		System.out.println("Kraj dohvacanja svih objava");
		return l;
	}
}