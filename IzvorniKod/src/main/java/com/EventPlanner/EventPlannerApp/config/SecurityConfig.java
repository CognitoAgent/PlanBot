package com.EventPlanner.EventPlannerApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//configuration file to Spring
@Configuration
@CrossOrigin(origins="https://planbot-9s64.onrender.com")
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
		System.out.println("Pozvali corsConfigurationSource");
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowCredentials(true);
        
        //corsConfig.addAllowedOrigin("*"); // Allow React frontend
        corsConfig.setAllowedOriginPatterns(Arrays.asList("*"));//planbot-9s64.onrender.com/", "https://planbot-9s64.onrender.com/login"));
        corsConfig.setAllowedMethods(Arrays.asList("HEAD", "PATCH", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
        //corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));//instead of GET, POST, ...
        corsConfig.setAllowedHeaders(Arrays.asList("*"));//instead of GET, POST, ...
        corsConfig.setExposedHeaders(Arrays.asList("Authorization", "Cache-Control")); // Allow all headers
        corsConfig.addAllowedOriginPattern("*");
        corsConfig.addAllowedOriginPattern("https://52.213.213.5:8443/login");
        corsConfig.addAllowedOriginPattern("https://52.213.213.5:8443/AdminPanel");
        corsConfig.addAllowedOriginPattern("planbot-9s64.onrender.com");
        corsConfig.addAllowedOriginPattern("planbot-9s64.onrender.com/");
        corsConfig.addAllowedMethod("OPTIONS");
        corsConfig.addAllowedHeader("*");
        List a = corsConfig.getAllowedHeaders();
        System.out.println("Headers");
        System.out.println(a);
        
        List b = corsConfig.getAllowedOriginPatterns();
        System.out.println("Patterns");
        System.out.println(b);
        
        List c = corsConfig.getAllowedMethods();
        System.out.println("Methods");
        System.out.println(c);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Apply to all endpoints
        return source;
    }
	*/	
	
	@Autowired
    private WebMvcConfigurer corsConfigurer;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		System.out.println("Pozvali securityFilterChain");
		System.out.println("Pozvali securityFilterChain cors");
		System.out.println("http="+http.headers(h -> h.toString()));
		http.cors(Customizer.withDefaults())
		;
		
		
		//disable csrf
		http.csrf(customizer -> customizer.disable());
		
		
        // Redirect HTTP to HTTPS
        http.requiresChannel(channel -> 
            channel.anyRequest().requiresSecure()
        )
        // Configure CSRF, CORS, and other elements as needed
        .authorizeHttpRequests(request -> request
        	.requestMatchers(HttpMethod.OPTIONS).permitAll() 
        	.requestMatchers(HttpMethod.POST, "register", "login", "/register", "/login", "/**")
        	.permitAll()
            .anyRequest().authenticated() // Example to require authentication
        );
		//now, no login is required, we are implementing our own
		
		
		/*
		//no one should be able to access without authentification
		http.authorizeHttpRequests(request -> request
				.requestMatchers("register", "login")//2 links i do not want to secure, not necessary
				.permitAll()	//two 2 links permitted; any other will be authenticated
				.anyRequest().authenticated());
		*/
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