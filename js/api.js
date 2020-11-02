const BASE_URL  = `https://api.football-data.org/v2/`;
const options   = {
                    headers: {
                      'X-Auth-Token': '060773586c554b0bb8893a4b68511a86'
                    }
                  };

// Mengecek kode status dari response
const status = response => {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);
    // Membuat blok catch
    return Promise.reject(new Error(response.statusText));
  } else {
    // Membuat blok then
    return Promise.resolve(response);
  }
}

// blok parsing json
const json = response => response.json();

// Handle error di blok catch
const error = error => {
  console.log(`Error: ${error}`);
}

// Data tim liga italia
const getTeams = () => {
  if ("caches" in window) {
    caches.match(BASE_URL + "teams").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var teamsHTML = "";
          data.result.forEach(function(team) {
            teamsHTML += `
            <div class="card-content">
            <span class="card-title truncate"><b>${team.name}</b></span>
          </div>
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light center-align">
            <img width="150" height="150" src="${team.crestUrl}" /> 
            <hr>
            Website: ${team.website} <br>
            Stadion: ${team.venue} <br>
            Warna Tim: ${team.clubColors}
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

  fetch(`${BASE_URL}competitions/2019/teams`, options)
    .then(status)
    .then(json)
    .then(data => {
      let teamsHTML = ``;
      data.teams.forEach(team => {
        teamsHTML += `
        <div class="card-content">
              <span class="card-title truncate"><b>${team.name}</b></span>
            </div>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light center-align">
              <img width="150" height="150" src="${team.crestUrl}" /> 
              <hr>
              Website: ${team.website} <br>
              Stadion: ${team.venue} <br>
              Warna Tim: ${team.clubColors}
            </div>
          </div>
        `;
      });
      document.getElementById('teams').innerHTML = teamsHTML;
    })
    .catch(error);
}

// Data klasemen liga italia
const getStandings = ()=>{
    fetch(`${BASE_URL}competitions/2019/standings`, options)
    .then(status)
    .then(json)
    .then(data => {
      let standingHTML = ``;
      data.standings.forEach(standing => {
        let standingList = ``;

        standing.table.forEach(team => {
          standingList += `
          <tr>
            <td class="center-align">${team.position}</td>
            <td>      
                <img width="25" src="${team.team.crestUrl}">
            </td>
            <td class="center-align">${team.playedGames}</td>
            <td class="center-align">${team.won}</td>
            <td class="center-align">${team.draw}</td>
            <td class="center-align">${team.lost}</td>
            <td class="center-align">${team.points}</td>
            <td class="center-align">${team.goalsFor}</td>
            <td class="center-align">${team.goalsAgainst}</td>
          </tr>
        `;
        })

        standingHTML = `
          <div class="card">
              <table class="responsive-table centered highlight">
                <thead>
                  <tr>
                    <th class="center-align">Position</th>
                    <th class="center-align">Team</th>
                    <th class="center-align">Played</th>
                    <th class="center-align">Won</th>
                    <th class="center-align">Draw</th>
                    <th class="center-align">Lost</th>
                    <th class="center-align">Points</th>
                    <th class="center-align">Goals For</th>
                    <th class="center-align">Goals Against</th>
                  </tr>
                </thead>
                <tbody>
                  ${standingList}
                </tbody>
              </table>
          </div>
        `;
      })
      document.getElementById('standings').innerHTML = standingHTML;
      })
}

// Data top scorer Liga Italia
const getScorers = ()=>{
  fetch(`${BASE_URL}competitions/SA/scorers`, options)
  .then(status)
  .then(json)
  .then(data => {
    let scorerHTML = ``;
    data.scorers.forEach(scorer => {
       scorerHTML += `
      <div class="card"> 
          <div>
         <span class="card-title truncate"><b>Pemain: ${scorer.player.name}</b></span>
         <span class="card-title truncate">Tim: ${scorer.team.name}</span>
         <span class="card-title truncate">Jumlah gol: ${scorer.numberOfGoals}</span>
         <a href="./players.html?id=${scorer.player.id}">Details</a>
       </div>
      </div>
      `;
    })
    document.getElementById('scorers').innerHTML = scorerHTML;
    })
}

function getScoreById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(BASE_URL + "players/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // Objek JavaScript dari response.json() masuk lewat variabel data.
          console.log(data);
          // Menyusun komponen card artikel secara dinamis
          var playersHTML = `
              <div class="card"> 
                <div>
                <span class="card-title truncate"><b>Pemain: ${data.name}</b></span>
                <span class="card-title truncate">Tanggal Lahir: ${data.dateOfBirth}</span>
                <span class="card-title truncate">Tempat Kelahiran: ${data.countryOfBirth}</span>
                <span class="card-title truncate">Warga Negara: ${data.nationality}</span>
                <span class="card-title truncate">Posisi: ${data.position}</span>
                </div>
              </div>
            `;
            document.getElementById("body-content").innerHTML = playersHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetch(BASE_URL + "players/" + idParam, options)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
      // Menyusun komponen card artikel secara dinamis
      var playersHTML = `
          <div class="card"> 
            <div>
            <span class="card-title truncate"><b>Pemain: ${data.name}</b></span>
            <span class="card-title truncate">Tanggal Lahir: ${data.dateOfBirth}</span>
            <span class="card-title truncate">Tempat Kelahiran: ${data.countryOfBirth}</span>
            <span class="card-title truncate">Warga Negara: ${data.nationality}</span>
            <span class="card-title truncate">Posisi: ${data.position}</span>
            </div>
          </div>
        `;  
        document.getElementById("body-content").innerHTML = playersHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedPlayers() {
  getAll().then(function(players) {
    console.log(players);
    // Menyusun komponen card artikel secara dinamis
    var playersHTML = "";
    players.forEach(function(player) {
      playersHTML += `
      <div class="card"> 
        <div>
        <a href="./players.html?id=${player.id}&saved=true">
        <span class="card-title truncate"><b>Pemain: ${player.name}</b></span>
        <span class="card-title truncate">Tanggal Lahir: ${player.dateOfBirth}</span>
        <span class="card-title truncate">Tempat Kelahiran: ${player.countryOfBirth}</span>
        <span class="card-title truncate">Warga Negara: ${player.nationality}</span>
        <span class="card-title truncate">Posisi: ${player.position}</span>
        </div>
      </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = playersHTML;
  });
}

function getSavedPlayerById() {
  var urlParams = new URLSearchParams(window.location.search);
  const idParam = parseInt(urlParams.get("id"));
  
  getById(idParam).then(function(players) {
    playersHTML = '';
    var playersHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${players.name}" />
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = playersHTML;
  });
}