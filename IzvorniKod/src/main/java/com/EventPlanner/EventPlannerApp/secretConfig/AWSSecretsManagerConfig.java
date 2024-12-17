package com.EventPlanner.EventPlannerApp.secretConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

@Configuration
public class AWSSecretsManagerConfig {

   // @Value("${"eu-central-1"}")
    //private String awsRegion;

    public String getSecret(String secretName) {
    	//secretName = "event/secrets";
        try (SecretsManagerClient client = SecretsManagerClient.builder()
                .region(Region.of("eu-central-1"))
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build()) {

            GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                    .secretId(secretName)
                    .build();

            GetSecretValueResponse response = client.getSecretValue(getSecretValueRequest);
            return response.secretString();
        }
    }
}
