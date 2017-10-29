#!/bin/bash
 
WEB_PATH='/var/www/html/hmap-js/'
WEB_USER='root'
PROJECT='HMap'
GITRES='/var/repository'
ROOT = 'dist/'
 
echo "Start deployment"
cd $GITRES
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "into"
cd $PROJECT
echo "npm run"
npm install
npm run dev
npm run build
echo "move"
mv -f $ROOT $WEB_PATH
echo "finsh"
nginx -s reload