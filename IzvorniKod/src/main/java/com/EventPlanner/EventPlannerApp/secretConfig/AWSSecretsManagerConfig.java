package com.EventPlanner.EventPlannerApp.secretConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

@Configuration
public class AWSSecretsManagerConfig {

   @Value("${aws.region}")
    private String awsRegion;
   
   @Value("${aws.accessKeyId}")
   private String accessKeyId;

   @Value("${aws.secretAccessKey}")
   private String secretAccessKey;
   
   @Value("${aws.secret.name}")
   private String secretName;

    public String getSecret() {
    	System.out.println("Dobiveni accesskey: "+accessKeyId);
    	System.out.println("Dobiveni secretAccesskey: "+secretAccessKey);
    	AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
    	
    	SecretsManagerClient client = SecretsManagerClient.builder()
    			.region(Region.of(awsRegion))
    			.credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
    			.build();
    	
    	GetSecretValueRequest request = GetSecretValueRequest.builder()
    			.secretId(secretName)
    			.build();
    	
    	GetSecretValueResponse response = client.getSecretValue(request);
    	return response.secretString();

         
    }
}
