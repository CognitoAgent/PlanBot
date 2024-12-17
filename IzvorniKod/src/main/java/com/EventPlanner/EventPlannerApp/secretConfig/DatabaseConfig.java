package com.EventPlanner.EventPlannerApp.secretConfig;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class DatabaseConfig {

    @Autowired
    private AWSSecretsManagerConfig secretsManagerConfig;

    @Value("${aws.secret.name}")
    private String secretName;

    public Map<String, String> getDatabaseCredentials() throws Exception {
        String secretString = secretsManagerConfig.getSecret(secretName);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(secretString, Map.class);
    }
}
