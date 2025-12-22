FROM eclipse-temurin:17-jdk

# Create folder for runner script
RUN mkdir -p /runner

# Copy your script into container
COPY run.sh /runner/run.sh

# Make script executable
RUN chmod +x /runner/run.sh

# Set workspace where judge mounts user code
WORKDIR /workspace

# ENTRYPOINT must be ABSOLUTE PATH
ENTRYPOINT ["/runner/run.sh"]
