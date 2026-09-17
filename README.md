# Hisab — Android APK build

Hisab keeps the existing React/TanStack application as the product source of truth while packaging it as a real Android application with Capacitor.

## Architecture

```text
React/TanStack source
        ↓
npm install
        ↓
npm run build:mobile
        ↓
npx cap add android
        ↓
setup native branding
        ↓
npx cap sync android
        ↓
android/gradlew assembleDebug
        ↓
app-debug.apk
        ↓
GitHub Actions artifact
```

The Android project is intentionally **generated in CI** and is not committed. This keeps the repository light and follows the proven build pattern.

## Build on GitHub

1. Push this repository to GitHub.
2. Open **Actions → Build Hisab APK → Run workflow** (or push to `main`/`master`).
3. Wait for the workflow to finish.
4. Download the **Hisab-debug-APK** artifact.
5. Install `app-debug.apk` on an Android device for testing.

## Important

The APK bundles the web application into the Android package through Capacitor; it is not a WebView pointing at the live Netlify URL.

For the Android build, authentication is disabled so the core local Hisab experience works without a server-side auth runtime. The existing client-side finance logic and local persisted data remain unchanged.

## Theme system

The selected Hisab theme is part of the existing Zustand settings state and is persisted with the finance data. The available themes include Midnight, Mint, Lime, Minimal, Warm, plus compatibility with the legacy Dark and Ocean IDs.
