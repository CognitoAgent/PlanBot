package com.EventPlanner.EventPlannerApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.domain.UserPrincipal;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepo repo;
	
	@Override //we need a layer that will fetch data for this class: UserRepo
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//getting username, have to check if username exists in db
		System.out.println("Searching for user: " + username);
		User user = repo.findByUsername(username);
		
		if(user==null) {
			System.out.println("User not found");
			throw new UsernameNotFoundException("user not found");
		}
		//if found, it should return UserDetails, but that is an interface -> making UserPrincipal, a class that implements UserDetails
		return new UserPrincipal(user);
	}

}
