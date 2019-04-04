#!/bin/sh
ipfs add --recursive --quieter --wrap-with-directory --chunker=rabin index.html css images javascript json > lastpubver
