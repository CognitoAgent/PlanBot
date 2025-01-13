package com.EventPlanner.EventPlannerApp.domain;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="suggestions")
public class Suggestion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date date;
	private String location;
	
//	@ManyToOne
//	private User fromUser;
	
	public Suggestion(Date d, String l) {
		date = d;
		location = l;
	}
	
	public Suggestion() {
		
	}
	
	public Date getTime() {
		return date;
	}
	public void setTime(Date d) {
		date = d;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String l) {
		location = l;
	}
//	public User getFromUser() {
//		return fromUser;
//	}
//	public void setFromUser(User fromUser) {
//		this.fromUser = fromUser;
//	}
	
	
}