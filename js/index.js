// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  document.addEventListener("DOMContentLoaded", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(() => {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}