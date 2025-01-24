package com.EventPlanner.EventPlannerApp.repo;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    //Post addPost(Post p);
	List<Post> findAll();
	List<Post> findByPublishedBy(User u);//find by user id
	
	Optional findById(Long id);
	boolean existsById(Long id);
}