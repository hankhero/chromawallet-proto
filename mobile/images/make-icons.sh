# uses imagemagick
# First did the same thing, then discovered this gist
# https://gist.github.com/LinusU/7515016


rm generated/android/*
rm generated/ios/*

#
# (OS X, Unix and Linux)
#
# What is this?
#
# It's a shell script that is using ImageMagick to create all the icon files from one source icon.
#
#
 
ICON=${1:-"icon.png"}
 
mkdir android
convert $ICON -resize 36x36 generated/android/icon-36-ldpi.png
convert $ICON -resize 48x48 generated/android/icon-48-mdpi.png
convert $ICON -resize 72x72 generated/android/icon-72-hdpi.png
convert $ICON -resize 96x96 generated/android/icon-96-xhdpi.png
 
mkdir ios
convert $ICON -resize 29 generated/ios/icon-29.png
convert $ICON -resize 40 generated/ios/icon-40.png 
convert $ICON -resize 50 generated/ios/icon-50.png 
convert $ICON -resize 57 generated/ios/icon-57.png
convert $ICON -resize 58 generated/ios/icon-29@2x.png
convert $ICON -resize 60 generated/ios/icon-60.png
convert $ICON -resize 72 generated/ios/icon-72.png
convert $ICON -resize 76 generated/ios/icon-76.png  
convert $ICON -resize 80 generated/ios/icon-40@2x.png
convert $ICON -resize 100 generated/ios/icon-50@2x.png
convert $ICON -resize 114 generated/ios/icon-57@2x.png     
convert $ICON -resize 120 generated/ios/icon-60@2x.png
convert $ICON -resize 144 generated/ios/icon-72@2x.png
convert $ICON -resize 152 generated/ios/icon-76@2x.png
