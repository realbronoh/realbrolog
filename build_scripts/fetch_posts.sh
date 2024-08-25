#!/bin/bash

# source .env.local
if [ -f .env.local ]; then
  echo "Sourcing .env file..."
  source .env.local
fi

echo $POSTS_REPO_URL

# Define the project root directory
PROJECT_ROOT=$(pwd)

echo "project root dir: ${PROJECT_ROOT}"

# Define the target posts directory
POSTS_DIR="$PROJECT_ROOT/posts"

echo "post dir: ${POSTS_DIR}"

# Check if the posts directory exists
if [ -d "$POSTS_DIR" ]; then
  echo "Posts directory exists. Deleting it..."
  rm -rf "$POSTS_DIR"
else
  echo "Posts directory does not exist. Proceeding..."
fi

# Create a new posts directory
mkdir -p "$POSTS_DIR"

# Fetch posts from the private GitHub repository using curl
echo "Fetching posts from the private repository..."

# Clone the repository
CLONE_URL="https://${GITHUB_PAT}@${POSTS_REPO_URL}"
echo "clone url: ${CLONE_URL}"
git clone --depth=1 $CLONE_URL  $POSTS_DIR
rm -rf $POSTS_DIR/.git

echo "Posts have been fetched and saved to the $POSTS_DIR directory."
