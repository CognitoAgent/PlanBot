package com.EventPlanner.EventPlannerApp.service;

import java.sql.Date;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Optionals;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.EventPlanner.EventPlannerApp.domain.Comment;
import com.EventPlanner.EventPlannerApp.repo.CommentRepo;
import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.repo.PostRepo;   

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    public void addComment(Comment comment) {
        if (comment != null) {
            commentRepo.save(comment); // Save the comment to the database
        }
    }

}