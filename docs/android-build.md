# Android build notes

The generated Capacitor project is created only after the web bundle exists. This ordering matters because the Capacitor Android platform and its Gradle wrapper are generated artifacts.

GitHub Actions therefore does the following in order:

- Node 22
- `npm install`
- `npm run build:mobile`
- `npx cap add android`
- Java 17 + Gradle cache
- native setup
- `npx cap sync android`
- `./gradlew assembleDebug`

`capacitor.config.ts` points Capacitor at `.output/public`, where the TanStack Start SPA shell and assets are emitted for the mobile build.
