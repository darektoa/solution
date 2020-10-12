const CACHE_NAME = "PWApertama-v0";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    //page navigasi
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/gallery.html",
    // css
    "/css/materialize.min.css",
    "/css/materialize.css",
    "/css/style.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/css/PatrickHand-Regular.ttf",
    // logo
    "./image/wedding_logo.png",
    // aset image home
    "/image/wed28.webp",
    "/image/wed20.webp",
    "/image/wash_hand.png",
    "/image/mask.png",
    "/image/distancing.png",
    "/image/wed21.webp",
    //aset image gallery
    "/image/wed19.webp",
    "/image/wed23.webp",
    "/image/wed8.webp",
    "/image/wed27.webp",
    "/image/wed6.webp",
    "/image/wed2.webp",
    "/image/wed12.webp",
    "/image/wed7.webp",
    //file JS
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "js/sw-register.js",
    //icon
    "/image/icon_128.ico",
    "./image/icon_32.png",
    "./image/icon_64.png",
    "./image/icon_128.png",
    "./image/icon_144.png",
    "./image/icon_152.png",
    "./image/icon_192.png",
    "./image/icon_256.png",
    "./image/icon_384.png",
    "./image/icon_512.png"



];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", function(event) {
    // caches.open(CACHE_NAME)
    // .then(cache=>{
    //     console.log(cache.keys());
    // })
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});