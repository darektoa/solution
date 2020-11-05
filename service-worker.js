const CACHE_NAME = "football-fans-apps-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
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
    "/js/nav.js"
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
    if (event.request.url.indexOf(base_url) > -1){
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