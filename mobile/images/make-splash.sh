# uses imagemagick
# First did the same thing, then discovered this gist
# https://gist.github.com/LinusU/7515016


rm generated/ios-splash/*

#
# (OS X, Unix and Linux)
#
# What is this?
#
# It's a shell script that is using ImageMagick to create all the icon files from one source icon.
#
#
 
SPLASH=${1:-"coins02.jpg"}
 
# mkdir android
# convert $SPLAHS -resize 36x36 generated/android/icon-36-ldpi.png
# convert $SPLAHS -resize 48x48 generated/android/icon-48-mdpi.png
# convert $SPLAHS -resize 72x72 generated/android/icon-72-hdpi.png
# convert $SPLAHS -resize 96x96 generated/android/icon-96-xhdpi.png
 

#mkdir ios-

#http://docs.phonegap.com/en/3.5.0/config_ref_images.md.html#Platform%0AGuides
BASE=generated/ios-splash
convert $SPLASH -resize 640x1136^ -gravity center -extent  640x1136    $BASE/Default-568h@2x~iphone.png 
convert $SPLASH -resize 2048x1496^ -gravity center -extent  2048x1496   $BASE/Default-Landscape@2x~ipad.png 
convert $SPLASH -resize 1024x748^ -gravity center -extent  1024x748    $BASE/Default-Landscape~ipad.png 
convert $SPLASH -resize 1536x2008^ -gravity center -extent  1536x2008   $BASE/Default-Portrait@2x~ipad.png 
convert $SPLASH -resize 768x1004^ -gravity center -extent  768x1004    $BASE/Default-Portrait~ipad.png 
convert $SPLASH -resize 640x960^ -gravity center -extent  640x960     $BASE/Default@2x~iphone.png 
convert $SPLASH -resize 320x480^ -gravity center -extent  320x480     $BASE/Default~iphone.png 

# convert $SPLASH -resize 640x1136   $BASE/Default-568h@2x~iphone.png 
# convert $SPLASH -resize 2048x1496 -geometry 2048x1496 -gravity Center  $BASE/Default-Landscape@2x~ipad.png 
# convert $SPLASH -resize 1024x748 -geometry 1024x748 -gravity Center  $BASE/Default-Landscape~ipad.png 
# convert $SPLASH -resize 1536x2008 -geometry 1536x2008 -gravity Center  $BASE/Default-Portrait@2x~ipad.png 
# convert $SPLASH -resize 768x1004 -geometry 768x1004 -gravity Center  $BASE/Default-Portrait~ipad.png 
# convert $SPLASH -resize 640x960 -geometry 640x960 -gravity Center  $BASE/Default@2x~iphone.png 
# convert $SPLASH -resize 320x480 -geometry 320x480 -gravity Center  $BASE/Default~iphone.png 


