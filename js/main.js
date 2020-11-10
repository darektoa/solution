if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("ServiceWorker Berhasil Didaftarkan");
    })
    .catch((err) => {
      console.log("ServiceWorker Gagal didaftarkan");
    });
} else {
  console.log("Service Worker Belum Didukung di Browser Ini");
}
