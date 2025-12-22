FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN ./mvnw package || mvn package

EXPOSE 8080

CMD ["java", "-jar", "target/judge.jar"]
