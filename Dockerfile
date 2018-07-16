FROM node:8-alpine
LABEL MAINTAINER="Valentin Popov <info@valentineus.link>"

# Copy the application to the Docker image
COPY ["build", "/usr/src/app"]
WORKDIR "/usr/src/app"

# Environment Variables
ENV DEBUG="*"
ENV NODE_ENV="production"
ENV PORT="3000"

# Running the application
EXPOSE 3000
CMD ["node", "main.js"]
