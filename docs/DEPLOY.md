# Deploy and install

## Hosting the PWA (GitHub Pages)
Live at https://okaynowhat.github.io/kukeseen/ from the `gh-pages` branch, which holds only the contents of `app/`.

1. Commit changes on `main`.
2. Run `scripts/deploy-pages.sh`: it splits `app/` into the `gh-pages` branch with `git subtree split` and force-pushes it. Pages rebuilds within a minute.
3. All paths in `index.html`, `sw.js` and the manifest are relative, so the `/kukeseen/` sub-path works. Bump `VERSION` in `sw.js` so installed copies pick up the new shell.

Alternative: `docs/pages-workflow.yml` is a GitHub Actions workflow that publishes `app/` on every push to `main`. Moving it to `.github/workflows/` needs a token with the `workflow` scope (`gh auth refresh -s workflow`) and Pages set to "GitHub Actions".

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
The debug APK lands in `android/app/build/outputs/apk/debug/app-debug.apk`. Install with `adb install -r <apk>`. Release build and publishing: `scripts/release-apk.sh` builds a signed release APK (keystore at `~/keystores/kukeseen-release.keystore`, properties symlinked to `android/keystore.properties`, both outside git) and uploads it to the GitHub Release `v<version>` as `kukeseen-v<version>.apk` plus a stable `kukeseen.apk`. The web page links to `https://github.com/okaynowhat/kukeseen/releases/latest/download/kukeseen.apk`. Bump `version` in `package.json`, `VERSION` in `app/js/app.js` and `app/sw.js`, and `versionCode`/`versionName` in `android/app/build.gradle` together. Back up the keystore: without it no update can be installed over the published APK (see OQ-4).

## Local development
```
npm run serve      # static server on http://localhost:8793/
npm run shots      # Playwright screenshots + console error check into docs/screenshots/
```
