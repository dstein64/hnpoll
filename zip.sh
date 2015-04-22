#!/usr/bin/env bash

# run this from the package directory

# easier to see args in an array than a string
ARGS=()
ARGS+=("content.js")
ARGS+=("icon-48.png")
ARGS+=("icon-128.png")
ARGS+=("manifest.json")

zip -r archive.zip "${ARGS[@]}"

