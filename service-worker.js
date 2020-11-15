const CACHE_NAME = "infobola";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/pages/contact.html",
  "/pages/klasemen.html",
  "/pages/teams.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/index.js",
  "/icon.png",
  "/js/db.js",
  "/js/idb.js",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];


self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function (event) {
  const base_url = "football-data.org";
  const online = navigator.onLine;
  console.log(event.request);
  if (event.request.url.includes(base_url) && online){
    event. respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function(response){
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {'ignoreSearch': true}).then(function(response){
        return response || fetch (event.request);
      })
    )
  }
});


self.addEventListener("activate", function (event) {
  clients.claim();
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', event => {
  let body;
  if (event.data){
      body = event.data.text();
  } else {
      body = 'Push message payload kosong !';
  }
  const options = {
    icon: 'icons/icon-512x512.png',
    body: body,
    vibrate: [150, 50, 150],
    data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
    }
  };
  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  );
});