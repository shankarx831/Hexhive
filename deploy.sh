#!/bin/bash

# Exit immediately if a command fails
set -e

# Ask for commit message
read -p "Enter commit message: " COMMIT_MESSAGE

# Add all changes
git add .

# Commit with user message
git commit -m "$COMMIT_MESSAGE"

# Push to main branch
git push origin main

# Run npm deploy script
npm run deploy

echo "All commands executed successfully!"
