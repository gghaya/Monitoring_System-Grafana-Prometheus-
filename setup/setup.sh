#!/bin/bash
openssl genrsa -out /etc/certs/ca.key 2048
openssl req -new -x509 -key /etc/certs/ca.key -out /etc/certs/ca.crt -days 365 -batch
openssl req -new -nodes -out /etc/certs/prometheus.csr -newkey rsa:4096 -keyout /etc/certs/prometheus.key -subj '/CN=host.docker.internal'
# openssl req -new -nodes -out /etc/certs/prometheus.csr -newkey rsa:4096 -keyout /etc/certs/prometheus.key -subj "/CN=127.0.0.1" -config <(echo -e "[req]\ndistinguished_name = req_distinguished_name\n[req_distinguished_name]\n[alt_names]\n
# DNS.1 = prometheus.example.com\nIP.1 = 127.0.0.1")
openssl x509 -req -in /etc/certs/prometheus.csr -CA /etc/certs/ca.crt -CAkey /etc/certs/ca.key -CAcreateserial -out /etc/certs/prometheus.crt -days 730 -sha256
