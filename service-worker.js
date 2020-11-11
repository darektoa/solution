const CACHE_NAME = "football-fans-apps-v2";

const urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/squad.html",
    "/manifest.json",
    "/icons/favicon.png",
    "/icons/apple-icon.png",
    "/icons/pwa-32.png",
    "/icons/pwa-192.png",
    "/icons/pwa-512.png",
    "/css/materialize.min.css",
    "/js/api.js",
    "/js/materialize.min.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/nav.js",
    "/js/push.js",
    "/pages/team.html",
    "/pages/saved.html",
    "/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener("install", function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", function(event) {
    clients.claim();
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";
    const online = navigator.onLine;

    if (event.request.url.indexOf(base_url) > -1 && online){
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

self.addEventListener('push', event => {
    let body;
    if (event.data){
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'icons/pwa-512.png',
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