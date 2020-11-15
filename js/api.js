const team_url = `http://api.football-data.org/v2/teams/`;
const teams_url = `http://api.football-data.org/v2/competitions/2021/teams/`;
const standings_url = `https://api.football-data.org/v2/competitions/2021/standings/`;

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



const getData = () => {
  // Untuk mendapatkan data-data tim liga inggris
  fetch(teams_url, {
      headers: {
        'X-Auth-Token': 'cf02b37a12be47bd9c51e1c3db3e1d5f'
      }
    })
    .then(status)
    .then(json)
    .then(data => {

      let teamsHTML = ``;
      data.teams.forEach(team => {
        teamsHTML += `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${team.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title truncate">${team.name}</span>
            </div>
            <div class="card-action left-align">
              <a href="./detail.html?id=${team.id}">Details</a>
            </div>
          </div>
        `;
      });
      document.getElementById('teams').innerHTML = teamsHTML;
    })
    .catch(error);
}



function getTeamById() {
  return new Promise((resolve, reject)=>{
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    fetch(team_url + idParam, {
      headers: {
        'X-Auth-Token': 'cf02b37a12be47bd9c51e1c3db3e1d5f'
      }
    })
    .then(status)
    .then(json)
    .then(function(team) {
      console.log(team);
      const articleHTML = `
        <div class="card" style="width: 90%; max-width: 500px;">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${team.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title center">${team.name}</span>
          </div>
        </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
      resolve(team);
    });
  })
}



function getSavedTeamById() {
  return new Promise((resolve, reject)=>{
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    getById(idParam)
    .then(function(team) {
      console.log(team);
      const articleHTML = `
        <div class="card" style="width: 90%; max-width: 500px;">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${team.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title center">${team.name}</span>
          </div>
        </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
      resolve(team);
    });
  })
}



function getSavedTeams() {
  getAll()
  .then(function(teams) {
    let teamsHTML = ``;

    if(teams.length === 0) teamsHTML = '<p>Tidak ada yang tersimpan</p>';

    teams.forEach(team => {
      teamsHTML += `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${team.crestUrl}" />
          </div>
          <div class="card-content">
            <span class="card-title truncate">${team.name}</span>
          </div>
          <div class="card-action left-align">
            <a href="./detail.html?id=${team.id}&saved=true">Details</a>
          </div>
        </div>
      `;
    });
    document.getElementById('teams').innerHTML = teamsHTML;
  })
}


// Fungsi untuk mendapatkan data-data klasemen liga inggris
const getStandings = () => {
  fetch(standings_url, {
      headers: {
        'X-Auth-Token': 'cf02b37a12be47bd9c51e1c3db3e1d5f'
      }
    })
  .then(status)
  .then(json)
  .then(data => {
    let standingList = ``;
    data.standings.forEach(standing => {
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
        </tr>`;
      })
    });
    
    document.getElementById('standings').innerHTML = standingList;
  })
}