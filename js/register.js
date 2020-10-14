// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }

  // REQUEST API UNTUK PERTAMA KALI
  document.addEventListener("DOMContentLoaded", function() {
    //getArticles(); 
    const item = getHome();

    var save = document.getElementById("save");
    save.onclick = function () {
        console.log("Tombol FAB di klik.");
        item.then(function (key) {
            saveForLater(key);
        }); 
      }
  });

