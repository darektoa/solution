import $ from "jquery";
$(document).ready(function () {
    $(".preloader").fadeOut();
})
import moment from "moment";
import DataSource from '../data/data-source.js';

const main = () => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    //load page
    const loadPage = page => {
        const content = document.querySelector("#body-content");
        return fetch(`./src/pages/${page}.html`)
            .then(response => response.text())
            .then(responseText => {
                content.innerHTML = responseText
                if (page == "standing") {
                    console.log('standing');
                    getStandings();
                    $(document).ready(function () {
                        $(".preloader").fadeOut();
                    })
                } else if (page == "schedules") {
                    console.log('schedules');
                    getSchedules();
                    $(document).ready(function () {
                        $(".preloader").fadeOut();
                    })
                } else if (page == "home" || page == "") {
                    sliderMaterial();
                    getTime();
                    $(document).ready(function () {
                        $(".preloader").fadeOut();
                    })

                } else if (page == "contact") {
                    $(document).ready(function () {
                        $(".preloader").fadeOut();
                    })
                } else if (page == "saved") {
                    getSavedArticles();
                }
            })
            .catch(err => content.innerHTML = `<p>Upsss ${err}. Halaman tidak ada</p>`)
    }
    //load nav
    const loadNav = () => {
        return fetch("./src/nav.html")
            .then(response => response.text())
            .then(responseNya => {
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = responseNya;
                })
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", event => {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })
            })
            .catch(err => console.log(err));
    }
    loadNav();
    // ambil klasemen liga
    const getStandings = () => {
        const url = `https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL`; //competitions/PL/standings?standingType=TOTAL
        if ('caches' in window) {
            caches.match(`${url}`)
                .then(response => {
                    response.json();
                    console.log("pake data offline");
                })
                .then(data => {
                    let standingHTML = "";
                    data.standings[0].table.forEach(standing => {
                        standingHTML += `
                        <tr>
                        <td>${standing.position}</td>
                        <td>${standing.team.name}</td>
                        <td>${standing.won}</td>
                        <td>${standing.draw}</td>
                        <td>${standing.lost}</td>
                        <td>${standing.points}</td>
                        <td>
                        <a class="waves-effect btn-small" href='team.html?id=${standing.team.id}'>
                        <i class="material-icons">touch_app</i></a>
                        </td>
                        </tr>
                        `;
                    });
                    document.getElementById("standings").innerHTML = standingHTML;
                })
        }
        DataSource.standing()
            .then(data => {
                let standingHTML = "";
                data.standings[0].table.forEach(standing => {
                    standingHTML += `
                    <tr>
                    <td>${standing.position}</td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>
                    <a class="waves-effect btn-small" href='team.html?id=${standing.team.id}'>
                    <i class="material-icons">touch_app</i></a>
                    </td>
                    </tr>
                    `;
                });
                document.getElementById("standings").innerHTML = standingHTML;
            })
            .catch(err => console.log(`Error uy :${err}`))
    }
    // ambil jadwal pertandingan
    const getSchedules = () => {
        const url_base = `https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED`;
        if ('caches' in window) {
            caches.match(`${url_base}`)
                .then(response => {
                    response.json();
                    console.log("Pake data offline");
                })
                .then(data => {
                    let scheduledHTML = "";
                    data.matches.forEach(jadwal => {
                        scheduledHTML += `
                    <tr>
                    <td>${jadwal.utcDate}</td>
                    <td>${jadwal.homeTeam.name}</td>
                    <td>${jadwal.awayTeam.name}</td>
                    <td>
                    <a class="waves-effect btn-small" href='schedule.html?idj=${jadwal.id}'>
                        <i class="material-icons">touch_app</i></a>
                    </td>
                    
                    </tr>
                    `;
                    });
                    document.getElementById("jadwal").innerHTML = scheduledHTML;
                })


        }
        DataSource.scheduled()
            .then(data => {
                let scheduledHTML = "";
                data.matches.forEach(jadwal => {
                    scheduledHTML += `
                <tr>
                <td>${jadwal.utcDate}</td>
                <td>${jadwal.homeTeam.name}</td>
                <td>${jadwal.awayTeam.name}</td>
                <td>
                <a class="waves-effect btn-small" href='schedule.html?idj=${jadwal.id}'>
                    <i class="material-icons">touch_app</i></a>
                </td>
                
                </tr>
                `;
                });
                document.getElementById("jadwal").innerHTML = scheduledHTML;
            })
    }
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const idjParam = urlParams.get("idj");
    // ambil team by ID
    const getTeamById = () => {
        const url_base = "https://api.football-data.org/v2/teams/";
        console.log(idParam);
        if ('caches' in window) {
            caches.match(`${url_base}${idParam}`)
                .then(response => {
                    console.log(response);
                    response.json()
                })
                .then(data => {
                    let articleSquad = "";
                    let articleData = `
                <img src="${data.crestUrl}">
                
              
                        `;
                    data.squad.forEach(pemaen => {
                        const post = `${pemaen.position}`;
                        let warna;
                        let namePost;
                        if (post == 'Goalkeeper') {
                            warna = "orange darken-4";
                            namePost = 'Goalkeeper';
                        } else if (post == 'Defender') {
                            warna = "green accent-3";
                            namePost = 'Defender';
                        } else if (post == 'Midfielder') {
                            warna = "light-blue lighten-1";
                            namePost = 'midfielder';
                        } else if (post == 'Attacker') {
                            warna = "red accent-3";
                            namePost = 'Attacker';
                        } else {
                            warna = "purple darken-2";
                            namePost = "Manager";
                        }
                        articleSquad += ` <tr>
                        <td><a class="${warna} btn-small" href='#'>
                        <i class="material-icons">person</i></a></td>
                        <td>${namePost}</td>
                        <td>${pemaen.name}</td>
                      </tr>
                                  
                         `;
                    });


                    document.getElementById("teamBody").innerHTML = articleSquad;
                    document.getElementById("teamHead").innerHTML = articleData;
                })


        }

        DataSource.teamById(idParam)
            .then(data => {
                let articleSquad = "";
                let articleData = `
            <img src="${data.crestUrl}">
            
          
                    `;
                data.squad.forEach(pemaen => {
                    const post = `${pemaen.position}`;
                    let warna;
                    let namePost;
                    if (post == 'Goalkeeper') {
                        warna = "orange darken-4";
                        namePost = 'Goalkeeper';
                    } else if (post == 'Defender') {
                        warna = "green accent-3";
                        namePost = 'Defender';
                    } else if (post == 'Midfielder') {
                        warna = "light-blue lighten-1";
                        namePost = 'midfielder';
                    } else if (post == 'Attacker') {
                        warna = "red accent-3";
                        namePost = 'Attacker';
                    } else {
                        warna = "purple darken-2";
                        namePost = "Manager";
                    }
                    articleSquad += ` <tr>
                    <td><a class="${warna} btn-small" href='#'>
                    <i class="material-icons">person</i></a></td>
                    <td>${namePost}</td>
                    <td>${pemaen.name}</td>
                  </tr>
                              
                     `;
                });


                document.getElementById("teamBody").innerHTML = articleSquad;
                document.getElementById("teamHead").innerHTML = articleData;
                // console.log(articleData);
                // console.log(articleSquad);
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            });
    }
    // ambil jadwal by ID nya
    const getSchedulesById = () => {
        return new Promise((resolve, reject) => {
            const url_base = "https://api.football-data.org/v2/matches/";
            console.log(idjParam);
            if ('caches' in window) {
                caches.match(`${url_base}${idjParam}`)
                    .then(response => {
                        if (response) {

                        }
                        console.log("pake data offline");
                        response.json();
                    })
                    .then(data => {
                        let articleJadwal = ` 
                        <div class="card-content">
                          <div class="row card-panel">
                          <div class="col s12 center  purple darken-1 white-text">Time  : ${data.match.utcDate}</div>
                          <div class="col s4 center">${data.head2head.homeTeam.name}</div>
                          <div class="col s4 center">VS</div>
                          <div class="col s4 center">${data.head2head.awayTeam.name}</div>
                          <div class="col s12 center">Score : ${data.match.score.fullTime.homeTeam} - ${data.match.score.fullTime.awayTeam}</div>
                          <div class="col s12 purple darken-1 white-text">Venue : ${data.match.venue}</div>
                          </div>
                        </div>
                        `;
                        document.getElementById("jadwal").innerHTML = articleJadwal;
                        resolve(data);
                    })
                    .catch(err => console.log(err));
            }
            DataSource.scheduleByIdj(idjParam)
                .then(data => {
                    let articleJadwal = ` 
                            <div class="card-content">
                              <div class="row card-panel">
                              <div class="col s12 center  purple darken-1 white-text">Time  : ${data.match.utcDate}</div>
                              <div class="col s4 center">${data.head2head.homeTeam.name}</div>
                              <div class="col s4 center">VS</div>
                              <div class="col s4 center">${data.head2head.awayTeam.name}</div>
                              <div class="col s12 center">Score : ${data.match.score.fullTime.homeTeam} - ${data.match.score.fullTime.awayTeam}</div>
                              <div class="col s12 purple darken-1 white-text">Venue : ${data.match.venue}</div>
                              </div>
                            </div>                        
                            `;
                    document.getElementById("jadwal").innerHTML = articleJadwal;
                    // console.log(articleData);
                    // console.log(articleSquad);
                    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                    resolve(data);
                });

        })
    }
    const sliderMaterial = () => {
        const slider = document.querySelectorAll('.slider');
        M.Slider.init(slider, {
            indicators: false,
            height: 250,
            duration: 3000,
            interval: 6000
        });
    }

    let page = window.location.hash.substr(1);
    if (idParam != null) {
        getTeamById();
        $(document).ready(function () {
            $(".preloader").fadeOut();
        })
    } else if (idjParam != null) {
        sliderMaterial();
        $(document).ready(function () {
            $(".preloader").fadeOut();
        })
        const btnSave = document.getElementById("save");
        const btnDelete = document.getElementById("delete");
        btnSave.addEventListener("click", () => {
            const item = getSchedulesById();
            M.toast({ html: `1 ${item}` });
            console.log(item);
            item.then(result => {
                M.toast({ html: `2 ${result}` });
                console.log(result);
                saveForLater(result);
            })
        });
        var isFromSaved = urlParams.get("saved");
        if (isFromSaved) {
            // Hide fab jika dimuat dari indexed db
            btnSave.style.display = 'none';
            getSavedSchedulesById();
        } else {
            getSchedulesById();
            btnDelete.style.display = 'none';
        }
    } else if (page == "") {
        page = "home";
        loadPage(page);

        console.log("load page")
    } else {
        loadPage(page);
    }

    const getTime = () => {
        const from = moment().format("YYYY-M-D");
        const to = moment().add(10, 'days').format("YYYY-M-D");
        moment.locale("en");
        DataSource.nextMatch(from, to)
            .then(data => {
                let articleNextMatch = "";

                data.matches.forEach(match => {
                    articleNextMatch += `
                    <tr>
            <td>${match.homeTeam.name}</td>
            <td>${match.awayTeam.name}</td>
            <td>${match.utcDate}</td>
          </tr> `;
                })

                document.getElementById("nextMatch").innerHTML = articleNextMatch;
            })
    };



    function getSavedArticles() {
        getAll().then(function (articles) {
            console.log(articles);
            // Menyusun komponen card artikel secara dinamis
            var articlesHTML = "";
            articles.forEach(function (article) {
                articlesHTML += `
                <div class="card col s12 m6">
                        <a href="./schedule.html?idj=${article.id}&saved=true">
                            ${article.competition.name}
                          </a>
                          <div class="card-content">
                            <span class="card-title truncate">${article.homeTeam.name}</span>
                            <p>${article.awayTeam.name}</p>
                          </div>
                </div>
                      `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #body-content
            document.getElementById("savedSchedules").innerHTML = articlesHTML;
        });
    }



    //ambil jadwal dari database
    function getSavedSchedulesById() {
        // var urlParams = new URLSearchParams(window.location.search);
        // var idParam = urlParams.get("idj");
        getById(idjParam)
            .then(function (data) {
                let articleJadwal = ` 
                    <div class="card-content">
                    <div class="row card-panel">
                    <div class="col s12 center  purple darken-1 white-text">Time  : ${data.utcDate}</div>
                    <div class="col s4 center">${data.homeTeam.name}</div>
                    <div class="col s4 center">VS</div>
                    <div class="col s4 center">${data.awayTeam.name}</div>
                    <div class="col s12 center">Score : ${data.score.fullTime.homeTeam} - ${data.score.fullTime.awayTeam}</div>
                    <div class="col s12 purple darken-1 white-text">Venue : ${data.venue}</div>
                    </div>
                    </div>
                `;
                document.getElementById("jadwal").innerHTML = articleJadwal;
            });
    }

}
export default main;