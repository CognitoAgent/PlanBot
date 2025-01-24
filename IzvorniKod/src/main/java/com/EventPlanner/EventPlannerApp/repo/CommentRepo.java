package com.EventPlanner.EventPlannerApp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.EventPlanner.EventPlannerApp.domain.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>{

}
