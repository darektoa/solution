 // Mendaftarkan service worker
 if ("serviceWorker" in navigator) {
     window.addEventListener("load", function() {
         navigator.serviceWorker
             .register("/service-worker.js")
             .then(function() {
                 console.log("Pendaftaran ServiceWorker Berhasil.");
             })
             .catch(function() {
                 console.log("Pendaftaram ServiceWorker Gagal.");
             });
     });
 } else {
     console.log("Browser Belum Mendukung Fitur ServiceWorker");
 }