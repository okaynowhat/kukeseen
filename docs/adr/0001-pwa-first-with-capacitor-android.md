# ADR 0001: PWA first, Android via Capacitor, no framework

Date: 2026-10-17. Status: accepted.

## Context
One codebase must serve iPhone (installable from a website), Android (APK) and desktop. The owner's other apps use Expo React Native, but this app is map-centric and content-heavy, and the iPhone requirement rules out a native-only build without a Mac.

## Decision
Build a buildless PWA in `app/` (plain HTML, CSS, JS, vendored Leaflet 1.9.4 and self-hosted Alegreya Sans) with a service worker for offline shell and tile caching. Wrap the same folder with Capacitor 7 for Android so the APK works fully offline without hosting. A Trusted Web Activity was rejected because it needs a hosted origin with asset links; Expo was rejected because a WebView map plus web install path would duplicate work.

## Consequences
- One UI, one data file, one set of screenshots.
- iOS gets the PWA (Safari "Add to Home Screen"); compass heading needs the DeviceOrientation permission prompt, which the app shows.
- Android WebView geolocation works through Capacitor's permission bridge; the manifest declares fine and coarse location.
- No bundler means no TypeScript and no tree-shaking; app.js stays under about 600 lines by design.
