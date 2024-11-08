package com.EventPlanner.EventPlannerApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.stereotype.Service;

//configuration file to Spring
@Configuration
//we do not want the default config, we want our custom
@EnableWebSecurity //don't use the default config, use this one here!
public class SecurityConfig {
	//we need a method that will return securityFilterChain
	
	@Autowired
	private UserDetailsService userDetailsService;
			
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		//now, no login is required, we are implementing our own
		
			
		//disable csrf
		http.csrf(customizer -> customizer.disable());
		
		//no one should be able to access without authentification
		http.authorizeHttpRequests(request -> request.anyRequest().authenticated());
		
		//we need to get and use username and password
		//http.formLogin(Customizer.withDefaults());//default login, the one we have already seen before
										//we are also getting a form login as a result (visible when accessed with postman)
		http.httpBasic(Customizer.withDefaults()); //so it also works for postman(not sure)
		
		//making it stateless (we don't have to worry about sessionID)
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		return http.build();//returns our securityFilterChain
		
	}
	/* comment out bc we want to use database; instead, using the bean authenticationProvider
	//making our custom userDetailsService
	@Bean
	public UserDetailsService userDetailsService() {
		//userDetailsService - an interface
		
		UserDetails user1 = User.withDefaultPasswordEncoder()
								.username("kiran")
								.password("k@123")
								.roles("USER")
								.build();
		UserDetails user2 = User.withDefaultPasswordEncoder()
				.username("harsh")
				.password("h@123")
				.roles("ADMIN")
				.build();
		return new InMemoryUserDetailsManager(user1, user2);//class that implements that interface; it also takes users with their inf
		
		
	}
	*/
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		//interface, using class that implements it
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());//no passw encoder, plain text
		provider.setUserDetailsService(userDetailsService); //creating our own userDetailsService
		return provider;
	}
}
