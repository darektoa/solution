// Blok kode untuk melakukan request data json
function getHome() {
  return new Promise(function(resolve, reject) {
  fetch(base_url+"2021/standings",{
    method: "GET",
    headers: {

            "X-Auth-Token": "2562d52563c540fd88386a0342752e78"}
        })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var tablesHTML = "";
      data.standings[0].table.forEach(function(key) {
        tablesHTML += `
                    <tr>
                      <td>${key.team.name}</td>
                      <td>${key.points}</td>
                      <td>${key.lost}</td>
                      <td>${key.playedGames}</td>
                      <td>${key.form}</td>
                    </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("tables").innerHTML = tablesHTML;
      resolve(data);
    })
    .catch(error);
  });
}


