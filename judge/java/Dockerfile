FROM eclipse-temurin:17-jdk

WORKDIR /workspace

COPY . .

RUN chmod +x run.sh

EXPOSE 8080

CMD ["sh", "-c", "while true; do sleep 3600; done"]
