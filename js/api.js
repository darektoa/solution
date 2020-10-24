const BASE_URL  = `http://api.football-data.org/v2/`;
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

// Untuk mendapatkan data-data tim liga italia
const getTeams = () => {
  fetch(`${BASE_URL}competitions/2019/teams`, options)
    .then(status)
    .then(json)
    .then(data => {
      let teamsHTML = ``;
      data.teams.forEach(team => {
        teamsHTML += `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img width="150" height="150" src="${team.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title truncate"><b>${team.name}</b></span>
            </div>
            <div class="card-action">
              <a href="./pages/team.html?id=${team.id}">Details</a>
            </div>
          </div>
        `;
      });
      document.getElementById('teams').innerHTML = teamsHTML;
    })
    .catch(error);
}

// Untuk mendapatkan data klasemen liga italia
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

// Untuk mendapatkan data top scorer
const getScorers = ()=>{
  fetch(`${BASE_URL}competitions/SA/scorers`, options)
  .then(status)
  .then(json)
  .then(data => {
    let scorerHTML = ``;
    data.scorers.forEach(scorer => {
      let scorerList = ``;
      
      scorerList += `
      
    `;

      scorerHTML += `
        <div class="card">
            <table class="responsive-table centered highlight">
              <thead>
                <tr>
                  <th class="center-align">Nama Pemaian</th>
                  <th class="center-align">Tim</th>
                  <th class="center-align">Posisi Pemain</th>
                  <th class="center-align">Jumlah Gol</th>
                </tr>
              </thead>
              <tbody>
                ${scorerList}
              </tbody>
            </table>
        </div>
      `;
    })
    document.getElementById('scorers').innerHTML = scorerHTML;
    })
}

