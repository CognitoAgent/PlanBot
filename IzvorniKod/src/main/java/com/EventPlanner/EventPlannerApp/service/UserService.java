package com.EventPlanner.EventPlannerApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.EventPlanner.EventPlannerApp.domain.Post;
import com.EventPlanner.EventPlannerApp.domain.User;
import com.EventPlanner.EventPlannerApp.repo.UserRepo;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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


	public User getCurrentUser() {
        String username = getCurrentUsername();
        if (username != null) {
            return repo.findByUsername(username);
        }
        return null;
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


	public List<Post> getPublishedPosts() {
        User user = getCurrentUser();
        if (user != null) {
            return user.getPublishedPosts();
        }
        throw new IllegalStateException("No authenticated user found or user does not exist.");
    }

	public List<Post> getJoinedPosts() {
        User user = getCurrentUser();
        if (user != null) {
            return user.getJoinedPosts();
        }
        throw new IllegalStateException("No authenticated user found or user does not exist.");
    }

	public User getUserByUsername(String username) {
		return repo.findByUsername(username);
	}
	
	public List<User> getUsers(){
		try {
	        System.out.println("getUsers metoda pozvana, dohvacamo sve korisnike:");
	        List<User> users = repo.findAll();
	        if (users.isEmpty()) {
	            System.out.println("Nema korisnika");
	            return Collections.emptyList();
	        }
	        for (User s : users) {
	            System.out.println(s);
	        }
	        System.out.println("Kraj dohvacanja svih korisnika");
	        return users;
	    } catch (Exception e) {
	        System.err.println("Error in getUsers: " + e.getMessage());
	        return Collections.emptyList();
	    }
	}
	
	public User getUserById(Long id) {
		Optional optionalUser = repo.findById(id);
		if(optionalUser.isPresent()) {
			return (User)optionalUser.get();
		}
		return null;
	}
	
	public String deleteUser(Long id) {
        repo.deleteById(id);
        return "User has been deleted";
    }
	
	
}