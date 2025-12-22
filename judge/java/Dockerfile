FROM eclipse-temurin:17-jdk

WORKDIR /workspace

COPY . .

RUN chmod +x run.sh

EXPOSE 8080

CMD ["sh", "-c", "echo 'Judge service running' && while true; do nc -l -p 8080 -e echo 'OK'; done"]
