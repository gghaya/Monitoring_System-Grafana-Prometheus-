FROM alpine:latest
RUN apk update && apk add openssl
COPY setup.sh /setup.sh
RUN chmod +x /setup.sh
# CMD ["tail", "-f", "/dev/null"]
CMD ["sh", "/setup.sh"]