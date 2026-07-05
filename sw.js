/* Oh Geo service worker
   Offline-first: the whole game (flags included) lives in index.html,
   so precaching a handful of files makes the app fully offline.
   Bump CACHE_VERSION whenever you ship a new index.html. */

const CACHE_VERSION = "ohgeo-v2";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Google Fonts: stale-while-revalidate so type works offline after first visit
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache =>
        cache.match(req).then(cached => {
          const fetched = fetch(req)
            .then(res => { cache.put(req, res.clone()); return res; })
            .catch(() => cached);
          return cached || fetched;
        })
      )
    );
    return;
  }

  // App shell: cache-first, fall back to network, fall back to cached index
  event.respondWith(
    caches.match(req).then(cached =>
      cached ||
      fetch(req).catch(() => caches.match("./index.html"))
    )
  );
});
