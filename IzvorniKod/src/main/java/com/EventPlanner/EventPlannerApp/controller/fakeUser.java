package com.EventPlanner.EventPlannerApp.controller;

public class fakeUser {
	private Long id;
	private String username;
	private String emailAddress;
	
	public fakeUser(Long i, String usr, String ea) {
		id = i;
		username = usr;
		emailAddress = ea;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getEmailAddress() {
		return emailAddress;
	}
	
	
}
