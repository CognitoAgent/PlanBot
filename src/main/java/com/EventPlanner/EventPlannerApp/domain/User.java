package com.EventPlanner.EventPlannerApp.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity //it will create table User in sql - problem (user word already reserved for something else)
@Table(name="users") //creating table for User, but with different name
public class User {
	private Long id;
	private String username;
	private String password;
	private String emailAddress;
	//private List<Post> posts = new ArrayList<>(); I don't think it is needed
	private List<Post> joinedPosts = new ArrayList<>();
	
	

	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getEmailAddress() {
		return emailAddress;
	}



	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}





	public List<Post> getJoinedPosts() {
		return joinedPosts;
	}



	public void setJoinedPosts(List<Post> joinedPosts) {
		this.joinedPosts = joinedPosts;
	}



	public User() {
		// TODO Auto-generated constructor stub
	}

}
