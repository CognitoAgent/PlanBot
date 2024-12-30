package com.EventPlanner.EventPlannerApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@CrossOrigin(origins="https://planbot-9s64.onrender.com")
@Configuration
public class corsConfig implements WebMvcConfigurer{
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("*")
		.allowedOrigins("https://planbot-9s64.onrender.com", "https://planbot-9s64.onrender.com", "https://planbot-9s64.onrender.com/", "http://planbot-9s64.onrender.com", "http://planbot-9s64.onrender.com/");

    }
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				System.out.println("AAA1");
				registry.addMapping("*")
						.allowedOrigins("https://planbot-9s64.onrender.com", "https://planbot-9s64.onrender.com", "https://planbot-9s64.onrender.com/", "http://planbot-9s64.onrender.com", "http://planbot-9s64.onrender.com/")
						.allowedMethods("*")
						.allowedHeaders("*")
						.allowCredentials(true)
		                .maxAge(3600);
			}
		};
	}
}
