package com.EventPlanner.EventPlannerApp.secretConfig;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Component;

import java.util.Map;

import javax.sql.DataSource;

@Component
public class DatabaseConfig {

    @Autowired
    private AWSSecretsManagerConfig secretsManagerConfig;

    @Value("${aws.secret.name}")
    private String secretName;

    public Map<String, String> getDatabaseCredentials() throws Exception {
        String secretString = secretsManagerConfig.getSecret();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(secretString, Map.class);
    }
    
    @Bean
    public DataSource dataSource() throws Exception {
        Map<String, String> credentials = getDatabaseCredentials();
        
        System.out.println("Credentials");
        for(Map.Entry<String, String> e: credentials.entrySet()) {
        	System.out.println("key: "+e.getKey()+", value: "+e.getValue());
        }

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        //dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl(credentials.get("DATABASE_URL"));
        dataSource.setUsername(credentials.get("DATABASE_USERNAME"));
        dataSource.setPassword(credentials.get("DATABASE_PASSWORD"));

        return dataSource;
    }
}
