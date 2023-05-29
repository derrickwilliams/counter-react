#! /bin/bash

ROOTDIR=$PWD
DISTDIR="$ROOTDIR/dist"
PRODDIR="$ROOTDIR/prod"

echo "cleaning up $PRODDIR"
rm -rf "$PRODDIR/*"

echo "copying from $DISTDIR"
cp -R $DISTDIR/* $PRODDIR

cp $ROOTDIR/404.html $PRODDIR

# cleanup old stuff
# copy dist
# copy other files
