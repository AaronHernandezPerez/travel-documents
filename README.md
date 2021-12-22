
# Create key
```
keytool -genkey -v -keystore key_name.keystore -alias key_alias -keyalg RSA -keysize 2048 -validity 10000
```

# Create debug build
```
cd android
.\gradlew assembleDebug
```

# Create release build
```
cd android
.\gradlew assembleRelease
```