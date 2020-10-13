const CACHE_NAME = "PL-Futbol-v90";
var urlsToCache = [
  "/",
  "/bundle.js",
  "/manifest.json",
  "/src/app.js",
  "/src/icon16.png",
  "/src/icon192.png",
  "/src/icon512.png",
  "/src/index.html",
  "/src/maskable_icon512.png",
  "/src/nav.html",
  "/src/poi.gif",
  "/src/regsw.js",
  "/src/schedule.html",
  "/src/team.html",
  "/src/pages/contact.html",
  "/src/pages/home.html",
  "/src/pages/saved.html",
  "/src/pages/schedules.html",
  "/src/pages/standing.html",
  "src/script/component/footer-bar.js",
  "src/script/component/img-bar.js",
  "src/script/component/loading-bar.js",
  "src/script/data/data-source.js",
  "src/script/data/materialize.min.js",
  "src/script/view/main.js",
  "src/styles/loadingbar.css",
  "src/styles/materialize.min.css",
  "src/styles/style.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  const base_url = "https://api.football-data.org";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return fetch(event.request)
            .then(response => {
              cache.put(event.request.url, response.clone());
              return response;
            })
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }) //, { ignoreSearch: true, ignoreMethod: true }
        .then(response => {
          return response || fetch(event.request);
        })
    )
  }
  // event.respondWith(
  //   caches
  //     .match(event.request, { cacheName: CACHE_NAME })
  //     .then(response => {
  //       if (response) {
  //         console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
  //         return response;
  //       }
  //       const fetchRequest = event.request.clone();
  //       return fetch(fetchRequest)
  //         .then(response => {
  //           if (!response || response.status !== 200) {
  //             return response;
  //           }
  //           const responseToCache = response.clone();
  //           caches.open(CACHE_NAME)
  //             .then(cache => {
  //               cache.put(event.request, responseToCache);
  //             });
  //           return response;
  //         })
  //     })
  // );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME && cacheName.startsWith("PL-Futbol")) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});