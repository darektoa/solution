const base_url = "https://api.football-data.org/v2";

const loader = (status = true) => {
  // if (status) {
  //   document.querySelector("#loader").style.display = "block";
  //   document.querySelector("main").style.display = "none";
  // } else {
  //   document.querySelector("#loader").style.display = "none";
  //   document.querySelector("main").style.display = "block";
  // }
};

const getKlasemen = () => {
  loader();

  if ("caches" in window) {
    caches.match(`${base_url}/competitions/2021/standings`).then((response) => {
      console.log(response);
      if (response) {
        response.json().then((data) => {
          const klasemen = data.standings[0].table;
          let rows = "";
          klasemen.forEach((k) => {
            rows += `
              <tr>
                <td>${k.position}</td>
                <td>${k.team.name}</td>
                <td>${k.playedGames}</td>
                <td>${k.won}</td>
                <td>${k.draw}</td>
                <td>${k.lost}</td>
                <td>${k.points}</td>
              </tr>
            `;
          });

          document.querySelector(".klasemen tbody").innerHTML = rows;
          loader(false);
        });
      }
    });
  }

  fetch(`${base_url}/competitions/2021/standings`, {
    headers: {
      "X-Auth-Token": "9e686739edd846fab4308aba7218366c",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const klasemen = data.standings[0].table;
      let rows = "";
      klasemen.forEach((k) => {
        rows += `
          <tr>
            <td>${k.position}</td>
            <td>${k.team.name}</td>
            <td>${k.playedGames}</td>
            <td>${k.won}</td>
            <td>${k.draw}</td>
            <td>${k.lost}</td>
            <td>${k.points}</td>
          </tr>
        `;
      });

      document.querySelector(".klasemen tbody").innerHTML = rows;
      loader(false);
    })
    .catch((err) => console.log(err));
};

const getTeams = () => {
  loader();

  if ("caches" in window) {
    caches.match(`${base_url}/competitions/2021/teams`).then((response) => {
      if (response) {
        response.json().then((data) => {
          const teams = data.teams;
          let rows = "";
          let number = 1;
          teams.forEach((team) => {
            rows += `
              <tr>
                <td>${number}</td>
                <td><a href="team.html?id=${team.id}">${team.shortName}</a></td>
                <td>${team.name}</td>
                <td>${team.founded}</td>
                <td>${team.venue}</td>
                <td>${team.address}</td>
                <td><a href="${team.website}">${team.shortName}</a></td>
              </tr>
            `;
            number++;
          });
          document.querySelector(".team tbody").innerHTML = rows;
          loader(false);
        });
      }
    });
  }

  fetch(`${base_url}/competitions/2021/teams`, {
    headers: {
      "X-Auth-Token": "9e686739edd846fab4308aba7218366c",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const teams = data.teams;
      let rows = "";
      let number = 1;
      teams.forEach((team) => {
        rows += `
          <tr>
            <td>${number}</td>
            <td><a href="team.html?id=${team.id}">${team.shortName}</a></td>
            <td>${team.name}</td>
            <td>${team.founded}</td>
            <td>${team.venue}</td>
            <td>${team.address}</td>
            <td><a href="${team.website}">${team.shortName}</a></td>
          </tr>
        `;
        number++;
      });
      document.querySelector(".team tbody").innerHTML = rows;
      loader(false);
    })
    .catch((err) => console.log(err));
};

const getTeam = () => {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const id = urlParams.get("id");

  loader();

  if ("caches" in window) {
    caches.match(`${base_url}/teams/${id}`).then((response) => {
      if (response) {
        response.json().then((data) => {
          const competitions = data.activeCompetitions;
          const players = data.squad;
          let rows = "";

          document.querySelector(
            ".team .card-image"
          ).innerHTML = `<img src="${data.crestUrl}" alt="${data.name}" />`;
          console.log("caches: " + data.crestUrl);

          document.querySelector(
            ".team .card-content"
          ).innerHTML = `<h5 class="center-align">${data.name}</h5>`;

          competitions.forEach((competition) => {
            rows += `
              <tr>
                <td>${competition.name}</td>
                <td>${competition.area.name}</td>
                <td>${competition.code}</td>
              </tr>
            `;
          });

          document.querySelector(".active-competitions tbody").innerHTML = rows;
          rows = "";

          players.forEach((player) => {
            rows += `
              <tr>
                <td>${player.name}</td>
                <td>${player.position}</td>
                <td>${player.role}</td>
                <td>${player.dateOfBirth}</td>
                <td>${player.nationality}</td>
              </tr>
            `;
          });

          document.querySelector(".players tbody").innerHTML = rows;
          loader(false);
        });
      }
    });
  }

  fetch(`${base_url}/teams/${id}`, {
    headers: {
      "X-Auth-Token": "9e686739edd846fab4308aba7218366c",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const competitions = data.activeCompetitions;
      const players = data.squad;
      let rows = "";
      document.querySelector(
        ".team .card-image"
      ).innerHTML = `<img src="${data.crestUrl}" alt="${data.name}" />`;
      document.querySelector(
        ".team .card-content"
      ).innerHTML = `<h5 class="center-align">${data.name}</h5>`;
      competitions.forEach((competition) => {
        rows += `
          <tr>
            <td>${competition.name}</td>
            <td>${competition.area.name}</td>
            <td>${competition.code}</td>
          </tr>
        `;
      });
      document.querySelector(".active-competitions tbody").innerHTML = rows;
      rows = "";
      players.forEach((player) => {
        rows += `
          <tr>
            <td>${player.name}</td>
            <td>${player.position}</td>
            <td>${player.role}</td>
            <td>${player.dateOfBirth}</td>
            <td>${player.nationality}</td>
          </tr>
        `;
      });
      document.querySelector(".players tbody").innerHTML = rows;
      loader(false);
    })
    .catch((err) => console.log(err));
};

const getLastMatchDay = async () => {
  // cek jika data ada di dalam cache, maka gunakan yang ada di dalam cache
  if ("caches" in window) {
    const res = await caches.match(
      `${base_url}/competitions/2021/matches?status=FINISHED`
    );

    if (res) {
      const data = await res.json();
      const lastMatchday = data.matches[data.matches.length - 1].matchday;
      return lastMatchday;
    }
  }

  // jika data tidak ada di dalam cache, maka fetch data
  const res = await fetch(
    `${base_url}/competitions/2021/matches?status=FINISHED`,
    {
      headers: {
        "X-Auth-Token": "9e686739edd846fab4308aba7218366c",
      },
    }
  );
  const data = await res.json();
  const lastMatchday = data.matches[data.matches.length - 1].matchday;
  return lastMatchday;
};

const getMatch = async () => {
  loader();
  const lastMatchDay = await getLastMatchDay();
  console.log(lastMatchDay);

  if ("caches" in window) {
    caches
      .match(`${base_url}/competitions/2021/matches?matchday=${lastMatchDay}`)
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            let rows = "";
            matches = data.matches;

            matches.forEach((match) => {
              rows += `
                <tr>
                  <td>${formatDate(match.utcDate)}</td>
                  <td>${match.homeTeam.name}</td>
                  <td>
                    ${
                      match.score.fullTime.homeTeam == null
                        ? "-"
                        : match.score.fullTime.homeTeam
                    }
                    :
                    ${
                      match.score.fullTime.awayTeam == null
                        ? "-"
                        : match.score.fullTime.awayTeam
                    }
                  </td>
                  <td>${match.awayTeam.name}</td>
                </tr>
              `;
            });

            document.querySelector(".home tbody").innerHTML = rows;
            loader(false);
          });
        }
      });
  }

  fetch(`${base_url}/competitions/2021/matches?matchday=${lastMatchDay}`, {
    headers: {
      "X-Auth-Token": "9e686739edd846fab4308aba7218366c",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let rows = "";
      matches = data.matches;

      matches.forEach((match) => {
        rows += `
          <tr>
            <td>${formatDate(match.utcDate)}</td>
            <td>${match.homeTeam.name}</td>
            <td>
              ${
                match.score.fullTime.homeTeam == null
                  ? "-"
                  : match.score.fullTime.homeTeam
              }
              :
              ${
                match.score.fullTime.awayTeam == null
                  ? "-"
                  : match.score.fullTime.awayTeam
              }
            </td>
            <td>${match.awayTeam.name}</td>
          </tr>
        `;
      });

      document.querySelector(".home tbody").innerHTML = rows;
      loader(false);
    })
    .catch((err) => console.log(err));
};

const formatDate = (utcDate) => {
  const u = new Date(utcDate);
  const localDate = u.toLocaleString(u);
  return localDate;
};
