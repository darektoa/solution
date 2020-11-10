const CACHE_NAME = "premier-league";

const urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/team.html",
  "/pages/home.html",
  "/pages/klasemen.html",
  "/pages/teams.html",
  "/css/materialize.css",
  "/css/style.css",
  "/js/api.js",
  "/js/lib.js",
  "/js/main.js",
  "/js/materialize.js",
  "/js/nav.js",
  "/manifest.json",
  "img/icon-192.png",
  "img/icon-512.png",
];

// install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch aset dari cache
self.addEventListener("fetch", (event) => {
  const base_url = "https://api.football-data.org/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((response) => {
        return response || fetch(response.request);
      })
    );
  }
});

// menghapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("Cache dihapus" + cacheName);
            return caches.delete();
          }
        })
      );
    })
  );
});
