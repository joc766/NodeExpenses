# Use an official PostgreSQL Docker image as the base
FROM postgres:latest

# Set the environment variables
ENV POSTGRES_USER jackoconnor
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB expenses

# Copy any initialization scripts or configuration files
COPY schema.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
