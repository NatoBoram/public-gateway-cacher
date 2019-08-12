@echo off
ipfs add --recursive --quieter --wrap-with-directory --chunker=rabin index.html css images javascript json > public-gateway-cacher.ipfs
echo on
