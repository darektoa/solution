var base_url = "https://api.football-data.org/v2/";

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

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "teams").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var teamsHTML = "";
          console.log(data);

          data.teams.forEach(function(team) {
            let urlImage = team.crestUrl.replace(/^http:\/\//i, "https://");
            teamsHTML += `
            <div class="col s12 m4" >
            <div class="card tsundereTheme">
              <div class="card-image p-20">
                <img src="${urlImage}" class="w-150 h-150">
              </div>
              <div class="card-content h-100  white-text">
              <p><b>${team.name}</b></p>
              <a href="./team.html?id=${team.id}" class="mt-10 waves-effect waves-light btn-small">See Detail</a>
              </div>
            </div>
          </div>        
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;
        });
      }
    });
  }

  fetch(base_url + "teams", {
    headers: {
      "X-Auth-Token": "abe7d0c0804a484f9e9071765efccdb5"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // console.log(data, "non");

      // Menyusun komponen card artikel secara dinamis
      var teamsHTML = "";
      data.teams.forEach(function(team) {
        let urlImage = team.crestUrl.replace(/^http:\/\//i, "https://");
        teamsHTML += `
            <div class="col s12 m4" >
              <div class="card tsundereTheme">
                <div class="card-image p-20">
                  <img src="${urlImage}" class="w-150 h-150">
                </div>
                <div class="card-content h-100  white-text">
                <p><b>${team.name}</b></p>
                <a href="./team.html?id=${team.id}" class="mt-10 waves-effect waves-light btn-small">See Detail</a>
                </div>
              </div>
            </div>         
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            var teamHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
        "X-Auth-Token": "abe7d0c0804a484f9e9071765efccdb5"
      }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        let urlImage = data.crestUrl.replace(/^http:\/\//i, "https://");
        let members = "";
        for (const i in data.squad) {
          members += `
          <tr>
          <td>${Number(i) + 1}. ${data.squad[i].name} (${data.squad[i]
            .position || "-"})</td></tr>`;
        }
        // Menyusun komponen card artikel secara dinamis
        var teamHTML = `
          <div class="row mt-10">
            <div class="col s12 m6">
              <div class="card tsundereTheme br-20">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${urlImage}" class="w-100 h-100">
                </div>
              </div>          
            </div>
            <div class="col s12 m6 mt-10">
            <table class="striped">
                <tr>
                  <td>Team Name</td>
                  <td>:</td>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>${data.address}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>:</td>
                  <td>${data.phone}</td>
                </tr>
                <tr>
                  <td>Website</td>
                  <td>:</td>
                  <td>${data.website}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <td>Founded</td>
                  <td>:</td>
                  <td>${data.founded}</td>
                </tr>
            </table>
            </div>
          </div>
          <div class="divider"></div>
          <div class="row mt-20">
            <div class="col s12 m3">
            Members :
            </div>
            <div class="col s12 m9">
            <table class="striped">
            ${members}</div>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  });
}

function getSavedteams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function(team) {
      var description = team.post_content.substring(0, 100);
      teamsHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.cover}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedteamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function(team) {
    teamHTML = "";
    var teamHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.post_title}</span>
        ${snarkdown(team.post_content)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}
