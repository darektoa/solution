var base_url = "https://api.football-data.org/v2/";
var token = "f082f5122a044e16ac53733c139cb0a6";
var league_code = '2014';

var endpoint_all_team = `${base_url}competitions/${league_code}/teams`;
var endpoint_klasemen = `${base_url}competitions/${league_code}/standings`;
var endpoint__detail_team = `${base_url}teams/`;

var fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': token
        }
    });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}


// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk menghandle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}


// Blok kode untuk melakukan request data json
function getAllTeam() {

    // Check in caches
    if ('caches' in window) {
        caches.match(endpoint_all_team).then(function (response) {
            if (response) {

                response.json().then(function (data) {
                    var listKlubHTML = "";
                    data.teams.forEach(function (team) {
                        listKlubHTML += `
                                    <div class="col s12 m8 offset-m2 l6 ">
                                        <div class="card-panel grey lighten-5 z-depth-1">
                                        <div class="row valign-wrapper">
                                            <div class="col s4">
                                            <img src="${team.crestUrl}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                                            </div>
                                            <div class="col s10">
                                                <a href="./team_detail.html?id=${team.id}">
                                                    <span class="card-title">${team.name}</span>
                                                </a>
                                                <p>${team.address}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #list_klub
                    document.getElementById("list_klub").innerHTML = listKlubHTML;
                })
            }
        })
    }

    fetchApi(endpoint_all_team)
        .then(status)
        .then(json)
        .then(function (data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            var listKlubHTML = "";
            data.teams.forEach(function (team) {
                listKlubHTML += `
                    <div class="col s12 m8 offset-m2 l6 ">
                        <div class="card-panel grey lighten-5 z-depth-1">
                        <div class="row valign-wrapper">
                            <div class="col s4">
                            <img src="${team.crestUrl}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                            </div>
                            <div class="col s10">
                                <a href="./team_detail.html?id=${team.id}">
                                    <span class="card-title">${team.name}</span>
                                </a>
                                <p>${team.address}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #list_klub
            document.getElementById("list_klub").innerHTML = listKlubHTML;
        })
        .catch(error);
}

// Blok kode untuk melakukan request data json
function getKlasemen() {
    // Check in caches
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    klasemen(data);
                })
            }
        })
    }

    fetchApi(endpoint_klasemen)
        .then(status)
        .then(json)
        .then(function (data) {
            klasemen(data);
        })
        .catch(error);
}

// Blok kode untuk melakukan request data json
function getDetailTeam() {
    return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    var dataSquadHTML = ''
    var tabelSquadHTML = ''

    if ("caches" in window) {
        caches.match(endpoint__detail_team + idParam).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

                    document.getElementById("name_club").innerHTML = data.name;
                    document.getElementById("crest_club").src = data.crestUrl;
                    document.getElementById("name").innerHTML = data.name;
                    document.getElementById("address").innerHTML = data.address;
                    document.getElementById("phone").innerHTML = data.phone;
                    document.getElementById("website").innerHTML = data.website;
                    document.getElementById("founded").innerHTML = data.founded;
                    document.getElementById("venue").innerHTML = data.venue;


                    data.squad.forEach(function (squad, index) {
                        var position = squad.position != null ? squad.position : squad.role
                        dataSquadHTML += `
                        <tr>
                            <td >
                            <a href="#"> ${squad.name}</a>
                            </td>
                            <td >${position}</td>
                        </tr>
                        `
                    });

                    tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

                    document.getElementById("list_team").innerHTML = tabelSquadHTML;
                    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db

                    resolve(data);
                });
            }
        });
    }

    fetchApi(endpoint__detail_team + idParam)
        .then(status)
        .then(json)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

            document.getElementById("name_club").innerHTML = data.name;
            document.getElementById("crest_club").src = data.crestUrl;
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("address").innerHTML = data.address;
            document.getElementById("phone").innerHTML = data.phone;
            document.getElementById("website").innerHTML = data.website;
            document.getElementById("founded").innerHTML = data.founded;
            document.getElementById("venue").innerHTML = data.venue;

            data.squad.forEach(function (squad, index) {
                var position = squad.position != null ? squad.position : squad.role
                dataSquadHTML += `
                        <tr>
                            <td >
                            <a href="#"> ${squad.name}</a>
                            </td>
                            <td >${position}</td>
                        </tr>
                        `
            });

            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

            document.getElementById("list_team").innerHTML = tabelSquadHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
        })
        .catch(error);
    });
}