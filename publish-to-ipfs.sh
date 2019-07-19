#!/bin/sh
ipfs add --recursive --quieter --wrap-with-directory --chunker=rabin --cid-version=1 index.html css images javascript json > public-gateway-cacher.ipfs
