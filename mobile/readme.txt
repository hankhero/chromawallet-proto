
Notes about cordova, on Mac.

Install cordova
---------------

    npm install -g cordova (or prefix with sudo)

Download android developer bundle, adt-bundle-mac-x86_64-20140702.zip

edit bash for your platform as suggested here:
http://cordova.apache.org/docs/en/2.5.0/guide_getting-started_android_index.md.html

test if you have ant?

    ant -v

otherwise on mac with homebrew: 

    brew install ant


Set up cordova project
----------------------

Open new shell (to get new PATH, see above)

    cd mobile

    cordova platform add android

# Complains about missing plugins directory, ignore that:

    cordova restore plugins --experimental

    grunt

    cordova run

You should probably set up a device for cordova run to do something fun:

Debug on device
---------------
Get an android phone.
Connect with USB.
Make yourself a developer on the phone, a weird procedure:

http://stackoverflow.com/questions/16707137/how-to-find-and-turn-on-usb-debugging-mode-on-nexus-4

You now have 'developer' options on your phone settings.
Restart phone, reconnect.
Running 'adb devices' should now show your phone.
cordova run should trigger your phone.

Note: you can use chrome://inspect to connect to the phone with USB and debug remotely.

Debug trick
-----------

'if config' to find your ip address of your dev computer. If phone is
on same network, you can use debug console from chrome to do something
like this:

    window.location="http://192.168.0.229:9001/mobile/www/index.html"

It reloads the phones code from your local webserver provided by
grunt, so you don't need to package with cordova run for each small
change.

Debug with emulator (much inferior)
-----------------------------------

run 'android' command

add Intel x86 emulator accelerator HAXM (at bottom of extras) to get a faster emulator

Somewhere in your android folder extras/Intel/Hardware Acceleration 
you find an Installer (.dmg on mac). Run it.

    android avd

generate an emulator for android-19
