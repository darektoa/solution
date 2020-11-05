document.addEventListener("DOMContentLoaded", () =>{
    //Active sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200)
                return;

                document.querySelectorAll(".topnav, .sidenav").forEach( elms => {
                    elms.innerHTML = xhttp.responseText;
                });

                //Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", event => {
                        //Tutup sidenav
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    //Load pages content
    let page = window.location.hash.substr(1);
    if (page === "") page = "team";
    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                let content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    getAllTeams();
                    getAllMatches();
                    getAllStandings();
                } else if (this.status === 400) {
                    content.innerHTML = "<p> Halaman tidak ditemukan. </p>";
                } else {
                    content.innerHTML = "<p>Maaf.. Halaman tidak dapat diakses";
                }
            }
        };
        xhttp.open("GET",`pages/${page}.html`, true);
        xhttp.send();
    }
});