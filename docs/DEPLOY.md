# Deploy and install

## Hosting the PWA (GitHub Pages)
1. Create a repository (for example `okaynowhat/kukeseen`) and push this folder.
2. In repository settings, Pages, choose "GitHub Actions". The workflow in `.github/workflows/pages.yml` publishes `app/` on every push to `main`.
3. The app is then at `https://<user>.github.io/kukeseen/`. All paths in `index.html`, `sw.js` and the manifest are relative, so a sub-path works.

## Install on iPhone
Open the URL in Safari, tap Share, choose "Add to Home Screen". The app runs full screen, keeps finds in IndexedDB and caches map tiles. For the compass, tap "Luba kompass" once in the compass view; iOS asks for motion and orientation access.

## Install on Android from the website
Open the URL in Chrome. Chrome shows an install banner, or use menu, "Install app". The About screen also offers an install button when the browser allows it.

## Android APK (no hosting needed)
```
npm install
npx cap sync android
cd android && ./gradlew assembleDebug
```
The debug APK lands in `android/app/build/outputs/apk/debug/app-debug.apk`. Install with `adb install -r <apk>`. For a release build create a keystore and a `android/keystore.properties` (not committed), then add a `signingConfigs.release` block to `android/app/build.gradle` and run `assembleRelease`. See OQ-4.

## Local development
```
npm run serve      # static server on http://localhost:8793/
npm run shots      # Playwright screenshots + console error check into docs/screenshots/
```
