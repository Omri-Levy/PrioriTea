#!/bin/bash

git add .
echo commit message?
read -r COMMIT
git commit -m "$COMMIT"
git push