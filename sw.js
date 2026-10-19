/* Oh Geo: load the latest game online and keep an offline copy. */
const CACHE_VERSION = "ohgeo-v3-network-first";
const INDEX_URL = new URL("./index.html", self.registration.scope).href;

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const response = await fetch(INDEX_URL, { cache: "no-store" });

    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("text/html")
    ) {
      throw new Error(
        "Game download failed; keeping the previous offline version"
      );
    }

    const cache = await caches.open(CACHE_VERSION);
    await cache.put(INDEX_URL, response);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith("ohgeo-") && key !== CACHE_VERSION
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isPage = sameOrigin && (
    request.mode === "navigate" ||
    url.href.split(/[?#]/)[0] === INDEX_URL
  );

  if (isPage) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_VERSION);

      try {
        const response = await fetch(request, { cache: "no-store" });

        if (
          response.ok &&
          response.headers.get("content-type")?.includes("text/html")
        ) {
          await cache.put(INDEX_URL, response.clone());
          return response;
        }

        return (await cache.match(INDEX_URL)) || response;
      } catch (error) {
        const cached = await cache.match(INDEX_URL);
        if (cached) return cached;
        throw error;
      }
    })());

    return;
  }

  const isFont =
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";

  if (!sameOrigin && !isFont) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);

    try {
      const response = await fetch(request);

      if (response.ok || response.type === "opaque") {
        await cache.put(request, response.clone());
      }

      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      throw error;
    }
  })());
});
