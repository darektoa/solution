//fungsi file ini memasukan cache kedalam service worker agar bisa bekerja seperti navite atau offline
const CACHE_NAME = "firstpwa-v3";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/article.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",
    "/icon.png",
    "/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

self.addEventListener("install", event =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            return cache.addAll(urlsToCache);
        })
    );
});

//fungsi ini menyimpan aset web ke cache halaman ketika kode di reload
//Agar pengguna tidak mendapatkan halaman kosong saat koneksi internet tidak tersedia, brikut mengaplikasikan penyimpanan cache secara dinamis.
self.addEventListener("fetch", event => {
    let base_url = "https://readerapi.codepolitan.com/";

    if(event.request.url.indexOf(base_url) > -1){
    event.respondWith(
       caches.open(CACHE_NAME).then(cache =>{
           return fetch(event.request).then(response => {
               cache.put(event.request.url, response.clone());
               return response;
           })
       })
    );  
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(response => {
                return response || fetch (event.request);
            })
        )
    }
});

//fungsi ignoreSearch di atas News Reader dapat digunakan saat sedang offline minimal link pernah dibuka satukali.
//fungsi ini untuk menghapus chace lama/ sebelumnya untuk mengurangi pengggunaan cache
self.addEventListener("activate", event => {
    event.waitUntil(
            caches.keys().then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName =>{
                        if (cacheName != CACHE_NAME){
                            console.log("Service_worker: cache" + cacheName + "dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
});
