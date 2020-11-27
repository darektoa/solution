const CACHE_NAME = 'infobola-v1.0';
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/manifest.json",
  "/css/style.css",
  "/css/materialize.min.css",
  "/images/icon-144.png",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/pages/premier-league.html",
  "/pages/championship.html",
  "/pages/saved.html",
  "/js/notification-request.js",
  "/js/sw-register.js",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/db.js",
  "/js/idb.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];
 
self.addEventListener("install", function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "https://api.football-data.org/";
  const {onLine} = navigator;

  if (event.request.url.includes(base_url) && onLine) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches
      .match(event.request, { ignoreSearch: true })
      .then((response) => {
          return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
    const body = event.data ? event.data.text() : 'Push message no payload';

    const options = {
      body: body,
      icon: 'images/icon-512.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});