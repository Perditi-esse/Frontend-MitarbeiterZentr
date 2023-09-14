# Use an official web server image as a parent image
FROM nginx:alpine

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the contents of your HTML and CSS project to the default Nginx web server directory
COPY . /usr/share/nginx/html

# Copy the custom Nginx configuration file
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic (default for Nginx)
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
