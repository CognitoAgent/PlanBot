package com.EventPlanner.EventPlannerApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;

@Service
public class UserService {
	//for accepting someone's request
	//it is accepting it from the controller, but it is not responsible for sending data to database
		//-> use repository layer (UserRepo)
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
						//12 - number of rounds
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	AuthenticationManager authManager;
	
	public String register(User user) {
		if(user.getPassword() == null || user.getPassword().isEmpty()) {
			System.out.println(".register() je dobio prazan password");
		}
		//before we save the user, encrypt the password
			//using the Bcrypt Library, just need the object
		user.setPassword(encoder.encode(user.getPassword()));
		repo.save(user);//saves in database
		return jwtService.generateToken(user.getUsername());
	}
	
	public String verify(User user) {//giving details to authManager and asking it if the user is registered or not
		System.out.println("Pokusaj verificiranja "+user.getUsername()+" sa "+user.getPassword());
		Authentication authentication = 
				authManager.authenticate(//giving something unauthenticated, want it authenticated
						new UsernamePasswordAuthenticationToken(//giving username and password
								user.getUsername(), user.getPassword()));
		
		//let's check if it is authenticated
		if(authentication.isAuthenticated()) {
			//if so, login is successful - generate a token!
			//return "Success";
			return jwtService.generateToken(user.getUsername()); //implemented in JWTService
		}									//sending username for setSubject in generateToken()
		return "Failure";
	}
	
	public String getCurrentUsername() {
	    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    if (principal instanceof UserDetails) {
	        return ((UserDetails) principal).getUsername();
	    } 
	    return principal.toString(); // In case the principal is not a UserDetails instance
	}
	
	

	public Long getCurrentUserId() {
	    String username = getCurrentUsername();
	    User user = repo.findByUsername(username);
	    return (user != null) ? user.getId() : null;
	}

	public User getUserByUsername(String username) {
		return repo.findByUsername(username);
	}
}