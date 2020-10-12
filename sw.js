const CACHE_NAME = "Laliga-data-2";
var urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/manifest.json",
  "/team_detail.html",
  "/pages/klub.html",
  "/pages/klasemen.html",
  "/pages/favorite.html",
  "/pages/about.html",
  "/css/materialize.min.css",
  "/css/custom.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/main.js",
  "/js/api.js",
  "/js/indexedDB.js",
  "/js/klasemen.js",
  "/js/idb.js",
  "/js/database.js",
  "/js/team-detail.js",
  "/js/team-favorite.js",
  "/image/icon.png",
  "/image/laliga-512px.png",
  "image/laliga-192px.png",
];

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
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

self.addEventListener("install", function (event) {
  console.log("ServiceWorker: Menginstall..");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("Laliga-soccer")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});
