const CACHE_NAME = "masterpwa";
var urlsToCache = [
  "/",
  "/nav.html",
  "js/register.js",
  "/index.html",
  "/manifest.json",
  "/pages/home.html",
  "/pages/note.html",
  "/pages/biodata.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/js/api.js",
  "/js/table.js",
  "/assets/image/profil_.png",
  "/icon/favicon.png",
  "/icon/pwa-512.png",
  "/icon/pwa-192.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});



// self.addEventListener("fetch", function(event) {
//   

//     event.respondWith(
//       caches
//         .match(event.request, { cacheName: CACHE_NAME })
//         .then(function(response) {
//           if (response) {
//             console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//             return response;
//           }
   
//           console.log(
//             "ServiceWorker: Memuat aset dari server: ",
//             event.request.url
//           );
//           return fetch(event.request);
//         })
//     );
//   });

  self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/competitions/";

    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch (event.request);
        })
      )
    }
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });