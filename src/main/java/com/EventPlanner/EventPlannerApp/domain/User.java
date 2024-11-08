package com.EventPlanner.EventPlannerApp.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity //it will create table User in sql - problem (user word already reserved for something else)
@Table(name="users") //creating table for User, but with different name
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String password;
	private String emailAddress;
	//private List<Post> posts = new ArrayList<>(); I don't think it is needed
	@ManyToMany(mappedBy = "joinedBy") // Relationship to posts joined by the user
    private List<Post> joinedPosts = new ArrayList<>();
	
	@OneToMany(mappedBy = "publishedBy") // One user can publish many posts
    private List<Post> publishedPosts = new ArrayList<>();
	

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
	    // Default constructor
	}


	public User(Long i, String user, String p, String e) {
		id = i;
		username = user;
		password = p;
		emailAddress = e;
	}



	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", emailAddress=" + emailAddress
				+ "]";
	}
	
	

}
