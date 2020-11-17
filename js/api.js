window.addEventListener('load', ()=> {
   const loaderWrapper = document.querySelector('.progress')
   setTimeout(()=> {
      loaderWrapper.style.display = 'none';
   },500)
})



document.addEventListener('DOMContentLoaded', (e) => {
	let uclAPI = async () => {
		let fetchUCL = async () => {
			const baseUrl =
				'https://api.football-data.org/v2/competitions/CL/standings';

			const res = await fetch(baseUrl, {
				method: 'GET',
				headers: {
					'X-Auth-Token': 'a38f6061c64e4d0eb3a69d776925da4e',
				},
			});
			const data = await res.json();
			let standings = data.standings;

			standings
				.filter((standing) => standing.type == 'TOTAL')
				.forEach((standing) => {
					showStandingsUCL(standing);
				});
		};

		let showStandingsUCL = (standing) => {
			let bodyContent = document.querySelector('#body-content-1');
			bodyContent.innerHTML += `
      <div class="card">
         <p class="namagrup">${standing.group}</p>
         <table class="centered striped responsive-table">
            <thead>
               <tr>
                  <th>Position</th>
                  <th>Clubs</th>
                  <th>Win</th>
                  <th>Lose</th>
                  <th>Draw</th>
                  <th>Points</th>
               </tr>
            </thead>
               
            <tbody class="tableContent">
               <tr>
                  <td>${standing.table[0].position}</td>
                  <td>
                     <img src="${standing.table[0].team.crestUrl}" width="25px" style="margin-right: .5rem;"></img>
                     ${standing.table[0].team.name}
                  </td>
                  <td>${standing.table[0].won}</td>
                  <td>${standing.table[0].lost}</td>
                  <td>${standing.table[0].draw}</td>
                  <td>${standing.table[0].points}</td>
               </tr>
               <tr>
                  <td>${standing.table[1].position}</td>
                  <td>
                     <img src="${standing.table[1].team.crestUrl}" width="25px" style="margin-right: .5rem;"></img>
                     ${standing.table[1].team.name}
                  </td>
                  <td>${standing.table[1].won}</td>
                  <td>${standing.table[1].lost}</td>
                  <td>${standing.table[1].draw}</td>
                  <td>${standing.table[1].points}</td>
               </tr>
               <tr>
                  <td>${standing.table[2].position}</td>
                  <td>
                     <img src="${standing.table[2].team.crestUrl}" width="25px" style="margin-right: .5rem;"></img>
                     ${standing.table[2].team.name}
                  </td>
                  <td>${standing.table[2].won}</td>
                  <td>${standing.table[2].lost}</td>
                  <td>${standing.table[2].draw}</td>
                  <td>${standing.table[2].points}</td>
               </tr>
               <tr>
                  <td>${standing.table[3].position}</td>
                  <td>
                     <img src="${standing.table[3].team.crestUrl}" width="25px" style="margin-right: .5rem;"></img>
                     ${standing.table[3].team.name}
                  </td>
                  <td>${standing.table[3].won}</td>
                  <td>${standing.table[3].lost}</td>
                  <td>${standing.table[3].draw}</td>
                  <td>${standing.table[3].points}</td>
               </tr>
            </tbody>
         </table>
      </div>`;
		};

		fetchUCL();
	};

	let plAPI = async () => {
		let fetchPL = async () => {
			const baseUrl =
				'https://api.football-data.org/v2/competitions/2021/standings';

			const res = await fetch(baseUrl, {
				method: 'GET',
				headers: {
					'X-Auth-Token': 'a38f6061c64e4d0eb3a69d776925da4e',
				},
			});
			const data = await res.json();
			let standings = data.standings;

			standings
				.filter((standing) => standing.type == 'TOTAL')
				.forEach((standing) => {
					showStandingsPL(standing);
				});
		};

		let showStandingsPL = (standing) => {
			let bodyContent = document.querySelector('#body-content-2');
			bodyContent.innerHTML += `
            <div class="card">
               <p class="namagrup">${standing.stage}</p>
               <table class="centered striped responsive-table">
                  <thead>
                     <tr>
                        <th>Position</th>
                        <th>Clubs</th>
                        <th>Win</th>
                        <th>Lose</th>
                        <th>Draw</th>
                        <th>Points</th>
                        <th>Play</th>
                     </tr>
                  </thead>
                  <tbody class="tableContent"></tbody>
               </table>
            </div>`;

			let TableContent = document.querySelector('.tableContent');
			standing.table.forEach((table) => {
				TableContent.innerHTML += `
               <tr>
                  <td>${table.position}</td>
                  <td>
                     <img src="${table.team.crestUrl}" width="25px" style="margin-right: .5rem;"></img>
                     ${table.team.name}
                  </td>
                  <td>${table.won}</td>
                  <td>${table.lost}</td>
                  <td>${table.draw}</td>
                  <td>${table.points}</td>
                  <td>${table.playedGames}</td>
               </tr>
         `;
			});
		};

		fetchPL();
	};

   let url = window.location.pathname;

   if(url === '/') url = '/index.html';
   
	if (url.indexOf('index.html') > -1) {
		uclAPI();
	} else {
		plAPI();
   }

});
