package com.EventPlanner.EventPlannerApp.domain;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.EventPlanner.EventPlannerApp.controller.UserLoginController;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity 
@Table(name="posts")//bc not sure if word "post" is already reserved, just to be sure
public class Post {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title; //maybe create entity (published, deleted, finished...)
	private Date date; 
	private String location; 
	private String description; 
	

	public Post() {
		
	}
	
	public Post(String t, Date d, String l, String desc) {
		title = t;
		date = d;
		location = l;
		description = desc;
	}
	
	@OneToOne(fetch=FetchType.EAGER, optional=true, cascade=CascadeType.ALL)
	@JoinColumn(name = "picture_id") // Specifies the foreign key column
	private ImageAttachment picture; 
	
	@ManyToOne(fetch=FetchType.EAGER, optional= false, cascade = CascadeType.MERGE)
	@JoinColumn(name = "published_by_id") // Foreign key for User
	private User publishedBy; 
	
	@ManyToMany //many users can join many posts
    @JoinTable(
        name = "user_joined_posts", //join table to handle the many-to-many relationship
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
	private List<User> joinedBy = new ArrayList<>(); 
	@ManyToMany
	@JoinTable(
	        name = "user_notjoined_posts", //join table to handle the many-to-many relationship
	        joinColumns = @JoinColumn(name = "post_id"),
	        inverseJoinColumns = @JoinColumn(name = "user_id")
	    )
	private List<User> NotJoinedBy = new ArrayList<>(); 
	@ManyToMany
	private List<Comment> comments = new ArrayList<>(); 
	@ManyToMany
	private List<Suggestion> suggestions = new ArrayList<>();

	public Long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	
	public ImageAttachment getPicture() {
		return picture;
	}
	public void setPicture(ImageAttachment picture) {
		this.picture = picture;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public User getPublishedBy() {
		return publishedBy;
	}
	public void setPublishedBy(User publishedBy) {
		this.publishedBy = publishedBy;
	}
	public List<User> getJoinedBy() {
		return joinedBy;
	}
	public void setJoinedBy(List<User> joinedBy) {
		this.joinedBy = joinedBy;
	}
	public List<User> getNotJoinedBy() {
		return NotJoinedBy;
	}
	public void setNotJoinedBy(List<User> notJoinedBy) {
		NotJoinedBy = notJoinedBy;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public List<Suggestion> getSuggestions() {
		return suggestions;
	}
	public void setSuggestions(List<Suggestion> suggestions) {
		this.suggestions = suggestions;
	}
	@Override
	public String toString() {
		return "Post [title=" + title +", date="+date+", location="+location+"description="+description+", publishedBy=" + publishedBy + "]";
	} 
	
	
	

}