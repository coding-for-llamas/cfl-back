#!/usr/bin/env bash

set -e

BRANCH=master

if [[ $BUILD_BRANCH != "master" ]];
then
    BRANCH=dev
fi

if [ ! -d caring-child-daycare ]; then
    (git clone https://github.com/coding-for-llamas/caring-child-daycare.git)
fi

(
cd caring-child-daycare || exit;
git stash;
git checkout $BRANCH;
git pull;
cd ..;
)

if [ -f .env ];
then
  (cp .env caring-child-daycare/;
  )
fi

(
cd caring-child-daycare;
yarn install;
)
