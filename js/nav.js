document.addEventListener("DOMContentLoaded", function() {
    // Fungsi aktif sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {

                if (this.status != 200) return;




                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });


                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });

            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    // Mengambil halaman konten
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    //modal
                    if (page === 'contact') {
                        var elems = document.querySelectorAll('.modal');
                        M.Modal.init(elems);
                    }
                    // parallax
                    if (page === 'home', 'gallery') {
                        var elems = document.querySelectorAll('.parallax');
                        M.Parallax.init(elems);
                    }
                    // menjalankan slider
                    if (page === 'gallery') {

                        // slider
                        const slider = document.querySelectorAll('.slider');
                        M.Slider.init(slider, {
                            indicators: false,
                            height: 500,
                            duration: 300,
                            interval: 3000
                        });
                    }
                    // Slider berakhir
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Ooooops............. Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. Halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

});