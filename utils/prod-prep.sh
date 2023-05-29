#! /bin/bash

ROOTDIR=$PWD
DISTDIR="$ROOTDIR/dist"
PRODDIR="$ROOTDIR/prod"


cd $PWD
npm run build

echo "cleaning up $PRODDIR"
rm -rf "$PRODDIR/*"

echo "copying from $DISTDIR"
mkdir -p $PRODDIR
cp -R $DISTDIR/* $PRODDIR

cp $ROOTDIR/404.html $PRODDIR/404.html

echo "DONE!"
