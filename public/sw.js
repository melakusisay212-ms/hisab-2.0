const CACHE_NAME = "hisab-static-v1";
const STATIC_ASSETS = ["/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-512-maskable.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// Intentionally no fetch interception. Hisab uses dynamic SSR, authentication,
// APIs, and local data; leaving requests to the browser prevents stale caches
// or the service worker from breaking application behavior.
