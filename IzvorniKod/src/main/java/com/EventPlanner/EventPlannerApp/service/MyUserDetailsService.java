package com.EventPlanner.EventPlannerApp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	private static final Logger logger = LoggerFactory.getLogger(MyUserDetailsService.class);

	@Autowired
	private UserRepo repo;
	
	@Override //we need a layer that will fetch data for this class: UserRepo
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//getting username, have to check if username exists in db
		logger.info("Searching for user: " + username);
		System.out.println("Searching for user: " + username);
		User user = repo.findByUsername(username);
		
		if(user==null) {
			logger.error("User not found: " + username);
			System.out.println("User not found");
			throw new UsernameNotFoundException("user not found");
		}
		//if found, it should return UserDetails, but that is an interface -> making UserPrincipal, a class that implements UserDetails
		return new UserPrincipal(user);
	}

}
