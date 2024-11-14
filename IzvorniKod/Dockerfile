# Use official Tomcat image as the base
FROM tomcat:9.0-jdk11-openjdk

# Remove the default web applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your WAR file into Tomcat's webapps folder
COPY target/EventPlannerApp-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Expose port 8080 (default for Tomcat)
EXPOSE 8080

# Start Tomcat when the container starts
CMD ["catalina.sh", "run"]
