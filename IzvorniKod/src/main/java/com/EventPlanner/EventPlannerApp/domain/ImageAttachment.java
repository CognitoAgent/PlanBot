package com.EventPlanner.EventPlannerApp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class ImageAttachment {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String imageURL;
	private String imageDesc;
	
	@OneToOne(mappedBy = "picture") // Reference back to Post
	private Post post;
	
	public String getImageURL() {
		return imageURL;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
	public String getImageDesc() {
		return imageDesc;
	}
	public void setImageDesc(String imageDesc) {
		this.imageDesc = imageDesc;
	}
	
	
}