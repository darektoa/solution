const API_KEY = "ee781b505f3142379ecacc8e8931d0c5";
const base_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${base_URL}competitions/${LEAGUE_ID}/teams`;
const ENDPOINT_MATCHES = `${base_URL}competitions/${LEAGUE_ID}/matches`;
const ENDPOINT_STANDING = `${base_URL}competitions/${LEAGUE_ID}/standings`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(response => {
            if (response.status !== 200){
                console.log(`Error: ${response.status}`);
                return Promise.reject(new Error(response.statusText))
            } else { 
                return Promise.resolve(response)
            }
        })
        .then(response => response.json())
        .catch(error => {
            console.log(error)
        })
};

function getAllTeams() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(response => {
            if (response) {
                response.json().then(data => {
                    console.log(`Competition Data : ${data}`)
                    showTeam(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
    .then(data => {
        showTeam(data);
    })
    .catch(error => {
        console.log(error)
    })
}

//fungsi untuk melihat daftar team liga inggris
function showTeam(data) {
    let teams = "";
    let teamElement = document.getElementById("teamsPremier")
    
    data.teams.forEach(team => {
        teams += `
                <tr>
                    <td><img class="responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="40px" alt="badge"/></td>
                    <td>${team.name}</td>
                    <td>${team.address}</td>
                    <td class="center">${team.founded}</td>
                </tr>
        `;
    });

     teamElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center">Logo Team</th>
                            <th class="center">Team Name</th>
                            <th class="center">Alamat</th>
                            <th class="center">Berdiri(tahun)</th>
                        </tr>
                     </thead>
                    <tbody id="teams">
                        ${teams}
                    </tbody>
                </table>
                
                </div>
    `;
}

//fungsi untuk melihat pertandingan yang ada di liga inggris
function getAllMatches(){
    if("caches" in window) {
        caches.match(ENDPOINT_MATCHES).then(response =>{
            if(response) {
                response.json().then(data=> {
                    console.log(`Match Competitions : ${data}`);
                    getMatch(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_MATCHES)
    .then(data => {
        getMatch(data);
    })
    .catch(error => {
        console.log(error)
    })
}

function getMatch(data){
    let matches = "";
    let matchElement = document.getElementById("matchPremier");

    data.matches.forEach(match => {
        matches += ` 
            <tr>
                <td>${match.utcDate}</td>
                <td>${match.status}</td>
                <td>${match.homeTeam.name}</td>
                <td>${match.score.fullTime.homeTeam}</td>
                <td>${match.awayTeam.name}</td>
                <td>${match.score.fullTime.awayTeam}</td>
            </tr>
        `;
    });

    matchElement.innerHTML =` 
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

        <table class="striped responsive-table">
        <thead>
            <tr>
                <th>Jadwal</th>
                <th>Status</th>
                <th>Home</th>
                <th>Score</th>
                <th>Away</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody id="matches">
            ${matches}
        </tbody>
    </table>
    </div>
    `;
}

//Fungsi untuk melihat papan klasemen liga inggris
function getAllStandings(){
    if("caches" in window) {
        caches.match(ENDPOINT_STANDING).then(response => {
            if(response){
                response.json().then(data => {
                    console.log(`Standing Data: ${data}`);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_STANDING)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("leagueStanding")

    data.standings[0].table.forEach(standing => {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}<td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
        `;
    });

    standingElement.innerHTML = `
            <div class="card" style="padding-left: 24px; padding-right:24px; margin-top: 30px;">

        <table class="striped responsive-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Team Name</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Point</th>
                </tr>
            </thead>
            <tbody id="standings">
                ${standings}
            </tbody>
        </table>
    `;
}