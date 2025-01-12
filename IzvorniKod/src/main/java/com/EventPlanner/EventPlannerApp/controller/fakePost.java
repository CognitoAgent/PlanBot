package com.EventPlanner.EventPlannerApp.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.EventPlanner.EventPlannerApp.domain.Comment;
import com.EventPlanner.EventPlannerApp.domain.ImageAttachment;
import com.EventPlanner.EventPlannerApp.domain.Suggestion;


public class fakePost {
	private Long id;
	private String title; 
	private Date date; 
	private String location; 
	private String description; 
	private ImageAttachment picture; 
	private String publishedBy; 
	private List<Comment> comments = new ArrayList<>(); 
	private List<Suggestion> suggestions = new ArrayList<>();
	
	public fakePost(Long i, String t, Date d, String l, String desc, ImageAttachment pic, String pb,
			List<Comment> cs, List<Suggestion> ss) {
		id = i;
		title = t;
		date = d;
		location = l;
		description = desc;
		picture = pic;
		publishedBy = pb;
		comments = cs;
		suggestions = ss;
		
	}
	
	public String getPublishedBy() {
		return publishedBy;
	}
	
	@Override
	public String toString() {
		return "Post [id="+id+", title=" + title +", date="+date+", location="+location
				+"description="+description+", publishedBy=" + publishedBy + "]";
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public Date getDate() {
		return date;
	}

	public String getLocation() {
		return location;
	}

	public String getDescription() {
		return description;
	}

	public ImageAttachment getPicture() {
		return picture;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public List<Suggestion> getSuggestions() {
		return suggestions;
	} 
	
}
