self.addEventListener("fetch", function(event) {
    event.responWidth(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan Aset Dari Cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat Aset Dari Server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});