package com.EventPlanner.EventPlannerApp.domain;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

//class that represents the user that is currently trying to log in, that we need to check
public class UserPrincipal implements UserDetails{
	private User user;
	//getting user from MyUserDetailsService
	public UserPrincipal(User u) {
		user = u;
	}

	//MuUserDetailsService sends us user we need to give inf about bc he has been found in db
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		//everyone is user
		return Collections.singleton(new SimpleGrantedAuthority("USER"));
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

}