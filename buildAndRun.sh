  ant debug
  adb -d install -r bin/upstage-debug.apk 
  adb shell am start com.ryangrieve.upstage/com.ryangrieve.upstage.upstage
  adb logcat *:S CordovaLog:V DroidGap:V
