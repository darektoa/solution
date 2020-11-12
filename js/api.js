const team_url = `http://api.football-data.org/v2/competitions/2021/teams`;
const standings_url = `https://api.football-data.org/v2/competitions/2021/standings`;

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
  fetch(team_url, {
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
              <a href="./pages/team.html?id=${team.id}">Details</a>
            </div>
          </div>
        `;
      });
      document.getElementById('teams').innerHTML = teamsHTML;
    })
    .catch(error);

    // Untuk mendapatkan data klasemen liga inggris
    fetch(standings_url, {
      headers: {
        'X-Auth-Token': 'cf02b37a12be47bd9c51e1c3db3e1d5f'
      }
    })
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

// // Fungsi untuk mendapatkan data-data klasemen liga inggris
// const getStandings = () => {
//   fetch(standings_url, {
//       headers: {
//         'X-Auth-Token': 'cf02b37a12be47bd9c51e1c3db3e1d5f'
//       }
//     })
//     .then(status)
//     .then(json)
//     .then(data => {

//       let standingHTML = ``;
      
//       data.standings.forEach(standing => {
//         let standingList = ``;
        
//         // nanti buat ngirim id ke halaman detail tim
//         // <a href="./detailTeam.html?id=${standing.team.id}">
//         standing.table.forEach(team => {
//           standingList += `
//           <tr>
//             <td class="center-align">${team.position}</td>
//             <td>      
//                 <img width="25" src="${team.team.crestUrl}">
//             </td>
//             <td class="center-align">${team.playedGames}</td>
//             <td class="center-align">${team.won}</td>
//             <td class="center-align">${team.draw}</td>
//             <td class="center-align">${team.lost}</td>
//             <td class="center-align">${team.points}</td>
//             <td class="center-align">${team.goalsFor}</td>
//             <td class="center-align">${team.goalsAgainst}</td>
//           </tr>
//         `;
//         })

//         standingHTML = `
//           <div class="card">
//               <table class="responsive-table centered highlight">
//                 <thead>
//                   <tr>
//                     <th class="center-align">Position</th>
//                     <th class="center-align">Team</th>
//                     <th class="center-align">Played</th>
//                     <th class="center-align">Won</th>
//                     <th class="center-align">Draw</th>
//                     <th class="center-align">Lost</th>
//                     <th class="center-align">Points</th>
//                     <th class="center-align">Goals For</th>
//                     <th class="center-align">Goals Against</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${standingList}
//                 </tbody>
//               </table>
//           </div>
//         `;
//       })
//       document.getElementById('standings').innerHTML = standingHTML;
//     })
// }

// const allData = () => {
//   getTeams();
//   getStandings();
// }