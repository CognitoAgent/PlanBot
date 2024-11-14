package com.EventPlanner.EventPlannerApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

//configuration file to Spring
@Configuration
//we do not want the default config, we want our custom
@EnableWebSecurity //don't use the default config, use this one here!
public class SecurityConfig {
	//we need a method that will return securityFilterChain
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtFilter jwtFilter;
	/*
	@Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        corsConfig.addAllowedOrigin("https://planbot-9s64.onrender.com/"); // Allow React frontend
        corsConfig.addAllowedMethod("GET");
        corsConfig.addAllowedMethod("POST");
        corsConfig.addAllowedMethod("PUT");
        corsConfig.addAllowedMethod("DELETE");
        corsConfig.addAllowedHeader("*"); // Allow all headers
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Apply to all endpoints
        return source;
    }
		*/	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		//now, no login is required, we are implementing our own
		//http.cors(corsCustomizer -> corsCustomizer.configurationSource(corsConfigurationSource()));
		
			
		//disable csrf
		http.csrf(customizer -> customizer.disable());
		
		//no one should be able to access without authentification
		http.authorizeHttpRequests(request -> request
				.requestMatchers("register", "login")//2 links i do not want to secure, not necessary
				.permitAll()	//two 2 links permitted; any other will be authenticated
				.anyRequest().authenticated());
		
		//we need to get and use username and password
		//http.formLogin(Customizer.withDefaults());//default login, the one we have already seen before
										//we are also getting a form login as a result (visible when accessed with postman)
		http.httpBasic(Customizer.withDefaults()); //so it also works for postman(not sure)
		
		//making it stateless (we don't have to worry about sessionID)
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		//adding filter before UPAFilter
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
				//object as a filter we want to add before the second param
		
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
			//we have encrypted passwords
		provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
		provider.setUserDetailsService(userDetailsService); //creating our own userDetailsService
		return provider;
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
		//authManager is an interface
		return config.getAuthenticationManager();//getting the object -> @Bean
		//we just want to get the hold onto the authManager that will later talk to the authProvider
	}
}
