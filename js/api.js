const API_KEY = "ee781b505f3142379ecacc8e8931d0c5";
const base_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${base_URL}competitions/${LEAGUE_ID}/teams`;


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
                    console.log(`Club Data : ${data}`)
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
                    <td>
                    <a href="./article.html?id=${team.id}">
                    <img class="responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="40px" alt="badge"/>
                    </a></td>
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

//Fungsi untuk melihat squad team liga inggris
function getTeamById() {
        const urlParams = new URLSearchParams(window.location.search);
        let idParams = urlParams.get("id");

        if("caches" in window){
            caches.match(`${base_URL}/teams/${idParams}`).then(response => {
                if (response) {
                    response.json().then(squad => {
                        console.log(`Club Team Data : ${squad}`)
                        showTeamById(squad);
                    })
                }
            })
        }
    fetchAPI(`${base_URL}/teams/${idParams}`)
    .then(squad => {
        showTeamById(squad);
    })
    .catch(error => {
        console.log(error)
    })
}

function showTeamById(squad){
    let squadElement = document.getElementById("body-content")

    squad.squad.forEach(player =>{
        squad += ` 
                <tr>
                <td>${player.name}</td>
                <td>${player.position}</td>
                <td>${player.nationality}</td>
                <td>${player.role}</td>
                </tr>
        `;
    });

    squadElement.innerHTML = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="striped responsive-table">
            <thead>
                    <tr>
                        <th class="center">Nama</th>
                        <th class="center">Posisi</th>
                        <th class="center">Kebangsaan</th>
                        <th class="center">Jabatan</th>
                    </tr>
            </thead>
                <tbody id="squad">
                ${squad}
                </tbody>
            </table> 
        </div>       
    `;
} 
