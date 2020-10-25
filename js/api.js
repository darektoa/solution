const base_url = "https://api.football-data.org/v2/";
const liga_id = 2002;
const standing = `${base_url}competitions/${liga_id}/standings/`;
const tim = `${base_url}/teams/`;
var dataTim;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '5853c9d33e9f463e8f24c01be86ffeae'
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getStanding() {
    if ("caches" in window) {
        caches.match(standing).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(standing)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    showLoader();
    let standings = "";
    let standingElement =  document.getElementById("main-content");
    hideLoader();

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

    standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTim() {
  if ("caches" in window) {
      caches.match(tim).then(function (response) {
          if (response) {
              response.json().then(function (data) {
                  showTim(data);
              })
          }
      })
  }

  fetchAPI(tim)
      .then(data => {
          showTim(data);
      })
      .catch(error => {
          console.log(error)
      })
}

function showTim(data) {
  showLoader();
  dataTim = data;
  var tims = "";
  data.teams.forEach(function (tim) {
      tims += `
      <div class="col s12 m6 l6">
      <div class="card">
      <a href="./detail.html?id=${tim.id}">
        <div class="card-content">
          <div class="center"><img width="64" height="64" src="${tim.crestUrl || 'img/empty_badge.svg'}"></div>
          <div class="center flow-text">${tim.name}</div>
          <div class="center">${tim.area.name}</div>
        </div>
        <div class="card-action right-align">
            <a class="waves-effect waves-light btn-small teal lighten-1" onclick="insertTeamListener(${tim.id})">Tambahkan Ke Favorit</a>
        </div>
      </a>  
      </div>
    </div>
      `;
  });
  document.getElementById("main-content").innerHTML = tims;
  hideLoader();
}


var elTimFavorit = () => {
var teams = getTimfav()
showLoader();

teams.then(data => {
  dataTim = data;
  var html = ' '
  html += '<div class="row">'
  data.forEach(tim => {
    html += `
    <div class="col s12 m6 l6">
      <div class="card">
        <div class="card-content">
          <div class="center"><img width="64" height="64" src="${tim.crestUrl || 'img/empty_badge.svg'}"></div>
          <div class="center flow-text">${tim.name}</div>
          <div class="center">${tim.area.name}</div>
        </div>
        <div class="card-action right-align">
            <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${tim.id})">Delete</a>
        </div>
      </div>
    </div>
  `
  })

  if(data.length == 0) html += '<h6 class="Kamu tidak memiliki tim favorit!</6>'

  html += "</div>"
  let doc = document.getElementById('main-content');
  doc.innerHTML = html;
  hideLoader();
})
}

// database operations
var dbx = idb.open('sepakbola', 1, upgradeDb => {
switch (upgradeDb.oldVersion) {
  case 0:
    upgradeDb.createObjectStore('tim', { 'keyPath': 'id' })
}
});



var insertTeam = (tim) => {
dbx.then(db => {
  var tx = db.transaction('tim', 'readwrite');
  var store = tx.objectStore('tim')
  tim.createdAt = new Date().getTime()
  store.put(tim)
  return tx.complete;
}).then(() => {
  M.toast({ html: `${tim.name} berhasil disimpan!` })
  console.log('Pertandingan berhasil disimpan');
}).catch(err => {
  console.error('Pertandingan gagal disimpan', err);
});
}

var deleteTeam = (idTim) => {
dbx.then(db => {
  var tx = db.transaction('tim', 'readwrite');
  var store = tx.objectStore('tim');
  store.delete(idTim);
  return tx.complete;
}).then(() => {
  M.toast({ html: 'Tim Sudah Di Hapus!' });
  elTimFavorit();
}).catch(err => {
  console.error('Error: ', err);
});
}

var getTimfav = () => {
return dbx.then(db => {
  var tx = db.transaction('tim', 'readonly');
  var store = tx.objectStore('tim');
  return store.getAll();
})
}



var insertTeamListener = idTim => {
var tim = dataTim.teams.filter(el => el.id == idTim)[0]
insertTeam(tim);
}

var deleteTeamListener = idTim => {
var c = confirm("Yakin Mau Hapus?")
if (c == true) {
  deleteTeam(idTim);
}
}

var showLoader = () => {
var html = `<div class="preloader-wrapper medium active">
            <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
            </div>`
  let doc = document.getElementById('loader');          
  doc.innerHTML = html;
}

var hideLoader = () => {
  let doc = document.getElementById('loader');
  doc.innerHTML = '';
}


function getTimById() {
  const idTeam = new URLSearchParams(location.search).get('id');
  
  if ("caches" in window) {
      caches.match(tim + idTeam).then(function (response) {
          if (response) {
              response.json().then(function (data) {
                  showTimById(data);
              })
          }
      })
  }

  fetchAPI(tim + idTeam)
      .then(data => {
          showTimById(data);
      })
      .catch(error => {
          console.log(error)
      })
}

function showTimById(data) {
  showLoader();
  
  console.log(data);
  const tim = `
    <div class="col s12 m6 l6">
      <div class="card">
        <div class="card-content">
          <div class="center"><img width="64" height="64" src="${data.crestUrl || 'img/empty_badge.svg'}"></div>
          <div class="center flow-text">${data.name}</div>
          <div class="center">${data.area.name}</div>
        </div>
      </a>  
      </div>
    </div>
  `;

  document.getElementById("body-content").innerHTML += tim;
  hideLoader();
}

