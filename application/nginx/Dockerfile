FROM debian:10
WORKDIR /app
RUN apt-get update && apt-get install -y nginx openssl \
    && rm -rf /var/lib/apt/lists/*
RUN openssl genrsa -out /app/ca.key 2048 && \
    openssl req -new -x509 -key /app/ca.key -out /app/ca.crt -days 365 -batch && \
    openssl req -new -nodes -out /app/nginx.csr -newkey rsa:4096 -keyout /app/nginx.key -subj '/CN=nginx' && \
    openssl x509 -req -in /app/nginx.csr -CA /app/ca.crt -CAkey /app/ca.key -CAcreateserial -out /app/nginx.crt -days 730 -sha256
COPY default.conf /etc/nginx/nginx.conf
RUN mkdir -p /var/www/frontend/
# RUN chown -R nginx:nginx /var/www/frontend
RUN chmod -R 755 /var/www/frontend
RUN cp /app/nginx.key /etc/nginx/
RUN cp /app/nginx.crt /etc/nginx/
RUN chmod 600 /etc/nginx/nginx.key /etc/nginx/nginx.crt
RUN mkdir -p /var/www/frontend
EXPOSE 443
# RUN cp nginx.crt /etc/ssl/certs/nginx.crt
# RUN cp nginx.key /etc/ssl/private/nginx.key
CMD ["nginx", "-g", "daemon off;"]