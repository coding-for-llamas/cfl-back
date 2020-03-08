#!/usr/bin/env bash

set -e

BRANCH=master

if [[ $BUILD_BRANCH != "master" ]];
then
    BRANCH=dev
fi

if [ ! -d cfl-front ]; then
    (git clone https://github.com/coding-for-llamas/cfl-front)
fi

(
cd cfl-front || exit;
git stash;
git checkout $BRANCH;
git pull;
cd ..;
)

if [ -f .env ];
then
  (cp .env cfl-front/;
  )
fi

(
cd cfl-front;
yarn install;
)
