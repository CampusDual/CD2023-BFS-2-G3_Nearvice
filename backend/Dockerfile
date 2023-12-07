FROM maven:3.9.1-eclipse-temurin-11-alpine
WORKDIR /app
COPY ./backend-api ./backend-api
COPY ./backend-boot ./backend-boot
COPY ./backend-model ./backend-model
COPY ./backend-ws ./backend-ws
COPY pom.xml .
EXPOSE 33333
RUN mvn install
WORKDIR /app/backend-boot
CMD mvn spring-boot:run