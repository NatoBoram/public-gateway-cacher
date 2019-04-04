@echo off
ipfs add --recursive --quieter --wrap-with-directory --chunker=rabin index.html app.js gateways.json > lastpubver
