package com.EventPlanner.EventPlannerApp.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import com.EventPlanner.EventPlannerApp.service.JWTService;
import com.EventPlanner.EventPlannerApp.service.MyUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//we want it to behave like a filter - extends...
@Component
@CrossOrigin(origins="planbot-9s64.onrender.com")
public class JwtFilter extends OncePerRequestFilter{
//we want this filter to activate for *every* request
	//and for every request only *once*
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	ApplicationContext context;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//response also as an argument if we want to add smthng to the response
		//from cilent side, we get "Bearer htuGnfMfnfdu..."
			//need to remove the "Bearer ", only get the token
		//that line is contained in the "Authorization" header of the request
		System.out.println("Pozvana doFilterInternal fja");
		String authHeader = request.getHeader("Authorization");
		System.out.println(authHeader);
		
		String token= null;
		String username = null;
		
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
			username = jwtService.extractUserName(token);
		}
		System.out.println("Dobiveni token "+token);
		
		//username should not be null and token is not already authenticated
		if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			//if the token is valid, we need to create auth object
			UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
													//want object of MyUserDetailsService class
			//creating validateToken() method
			if(jwtService.validateToken(token, userDetails)) {
				System.out.println("Token is valid");
				//token is valid -> using the next filter
				UsernamePasswordAuthenticationToken authToken //needs principal, credentials and authorities
					= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				//we also want authToken to have data from request
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				//we just need to now send authToken to SecurityContextHolder
				//adding the token to the chain
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			
		}
		//once this filter is done, go to the next one
		filterChain.doFilter(request, response);
		//JwtFilter done!
	}

}