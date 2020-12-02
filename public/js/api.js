const BASE_URL = "https://api.football-data.org/v2/";
const options = {
  headers: {
    'X-Auth-Token': 'c5f8084563a5461499f1e34285464811'
  },
}; 



// FUNCTION UNTUK MEMERIKSA STATUS RESPONSE YANG DI KEMBALIKAN DARI API
function status(response) {
  return new Promise((resolve, reject) => {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      reject(new Error(response.statusText));
    }
    
    resolve(response);
  });
}



// FUNCTION UNTUK MEM-PARSE RESPONSE DARI API MENJADI JSON
function json(response) {
  return response.json();
}



// FUNCTION UNTUK MENANGANI ERROR
function error(error) {
  console.log("Error : " + error);
}



// FUNCTION UNTUK MENGAMBIL DAN MENAMPILKAN DATA PREMIER LEAGUE STANDINGS
function getStandingsPL() {
  fetch(BASE_URL + 'competitions/2021/standings', options)
  .then(status)
  .then(json)
  .then((data) => {
    let standingsHTML = '';
    const standings = data.standings[0].table;

    standings.forEach(item => {
      standingsHTML += `
        <tr>
          <td>
            <a href="detail.html?id=${item.team.id}" class="center-wrap">
              <img src="${item.team.crestUrl}" class="icon-team" alt="">
              ${item.team.name}
            </a>
          </td>
          <td>${item.points}</td>
          <td>${item.playedGames}</td>
          <td>${item.won}</td>
          <td>${item.draw}</td>
          <td>${item.lost}</td>
        </tr>
      `;
    });

    document.querySelector("#premier-league > table > tbody").innerHTML = standingsHTML;
  })
  .catch(error);
}



// FUNCTION UNTUK MENGAMBIL DAN MENAMPILKAN DATA CHAMPIONSHIP STANDINGS
function getStandingsCS() {
  fetch(BASE_URL + 'competitions/2016/standings', options)
  .then(status)
  .then(json)
  .then((data) => {
    let standingsHTML = '';
    const standings = data.standings[0].table;

    standings.forEach(item => {
      standingsHTML += `
        <tr>
          <td>
            <a href="detail.html?id=${item.team.id}" class="center-wrap">
              <img src="${item.team.crestUrl}" class="icon-team" alt="">
              ${item.team.name}
            </a>
          </td>
          <td>${item.points}</td>
          <td>${item.playedGames}</td>
          <td>${item.won}</td>
          <td>${item.draw}</td>
          <td>${item.lost}</td>
        </tr>
      `;
    });

    document.querySelector("#championship > table > tbody").innerHTML = standingsHTML;
  })
  .catch(error)
}



// FUNCTION UNTUK MENGAMBIL DAN MENAMPILKAN DATA TEAM PER ID
function getTeamById() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(self.location.search);
    const idTeam = urlParams.get('id');
  
    fetch(BASE_URL + 'teams/' + idTeam, options)
    .then(status)
    .then(json)
    .then((data) => {
  
      const teamHtml = `
        <ul class="collection with-header">
          <li class="collection-header center"><img src="${data.crestUrl}" class="responsive-img" alt=""><h4>${data.name}</h4></li>
          <li class="collection-item"><div> Short Name <span class="secondary-content">${data.shortName}</span></div></li>
          <li class="collection-item"><div> Founded <span class="secondary-content">${data.founded}</span></div></li>
          <li class="collection-item"><div> Club Color <span class="secondary-content">${data.clubColors}</span></div></li>
          <li class="collection-item"><div> Area <span class="secondary-content">${data.area.name}</span></div></li>
        </ul>
      `;
  
      document.querySelector('#body-content').innerHTML = teamHtml;
      resolve(data);
    })
    .catch(error)
  })
}



// FUNCTION UNTUK MENAMPILKAN SEMUA DATA TEAM DARI INDEXED DB
function getSavedTeam() {
  getAll()
  .then((data) => {
    let teamHTML = '';
    data.length ? true : teamHTML = '<h3 class="grey-text darken-4">Empty</h3>'

    data.map((item) => {
      teamHTML += `        
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <img src="${item.crestUrl}" class="img-contain">
            </div>
            <div class="card-content center">
              <p>${item.name}</p>
            </div>
            <div class="card-action center">
              <a href="detail.html?id=${item.id}&saved=true">Detail</a>
            </div>
          </div>
        </div>
      `;
    })

    document.querySelector('#saved').innerHTML = teamHTML;
  })
}



// FUNCTIOn UNTUK MENAMPILKAN DATA TEAM PER ID DARI INDEXED DB
function getSavedTeamById() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    getById(idParam)
    .then((data) => {
      const teamHTML = `
        <ul class="collection with-header">
          <li class="collection-header center"><img src="${data.crestUrl}" class="responsive-img" alt=""><h4>${data.name}</h4></li>
          <li class="collection-item"><div> Short Name <span class="secondary-content">${data.shortName}</span></div></li>
          <li class="collection-item"><div> Founded <span class="secondary-content">${data.founded}</span></div></li>
          <li class="collection-item"><div> Club Color <span class="secondary-content">${data.clubColors}</span></div></li>
          <li class="collection-item"><div> Area <span class="secondary-content">${data.area.name}</span></div></li>
        </ul>
      `;
      
      document.getElementById("body-content").innerHTML = teamHTML;
      resolve(data);
    })
  });
}