const base_url = "https://api.football-data.org/v2/competitions/";
//const base_url = base_url.replace(/^http:\/\//i, 'https://api.football-data.org/v2/competitions/');
//2021/standings
//2562d52563c540fd88386a0342752e78
//url = url.replace(/^http:\/\//i, 'https://');
//compotitions
//https://api.football-data.org/v2/competitions/2021/standings

//<img src="${table.table.team}" />

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getArticles() {
  if ('caches' in window) {
    caches.match(base_url + "2021/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          data.standings[0].table.forEach(function(key) {
            articlesHTML += `
              <div class="card">
                  <a href="./standings.html?id=${key.team.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                    <img src="${key.team.crestUrl}" />
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${key.team.name}</span>
                    <p>Point: ${key.points}</p>
                    <p>Lost: ${key.lost}</p>
                    <p>Won: ${key.won}</p>
                  </div>
              </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
          resolve(data);
        })
      }
    })
  }

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
      var articlesHTML = "";
      data.standings[0].table.forEach(function(key) {
        articlesHTML += `
              <div class="card">
                <a href="./standings.html?id=${key.team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                  <img src="${key.team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${key.team.name}</span>
                  <p>Point: ${key.points}</p>
                  <p>Lost: ${key.lost}</p>
                  <p>Won: ${key.won}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      //document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

// function getArticleById() {
//   return new Promise(function(resolve, reject) {
//     // Ambil nilai query parameter (?id=)
//     var urlParams = new URLSearchParams(window.location.search);
//     var idParam = urlParams.get("id");
//     if ("caches" in window) {
//       caches.match(base_url + "article/" + idParam).then(function(response) {
//         if (response) {
//           response.json().then(function(data) {
//             // .... kode lain disembunyikan agar lebih ringkas
            
//             document.getElementById("body-content").innerHTML = articleHTML;
//             // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
//             resolve(data);
//           });
//         }
//       });
//     }
//     fetch(base_url + "article/" + idParam)
//       .then(status)
//       .then(json)
//       .then(function(data) {
//         // ... kode lain disembunyikan agar lebih ringkas 
        
//         document.getElementById("body-content").innerHTML = articleHTML;
//         // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
//         resolve(data);
//       });
//   });
// }

// function getArticleById() {
//   // Ambil nilai query parameter (?id=)
//   var urlParams = new URLSearchParams(window.location.search);
//   var idParam = urlParams.get("id");
//   fetch(base_url + "article/" + idParam)
//     .then(status)
//     .then(json)
//     .then(function(data) {
//       // Objek JavaScript dari response.json() masuk lewat variabel data.
//       console.log(data);
//       // Menyusun komponen card artikel secara dinamis
//       var articleHTML = `
//           <div class="card">
//             <div class="card-image waves-effect waves-block waves-light">
//               <img src="${data.result.cover}" />
//             </div>
//             <div class="card-content">
//               <span class="card-title">${data.result.post_title}</span>
//               ${snarkdown(data.result.post_content)}
//             </div>
//           </div>
//         `;
//       // Sisipkan komponen card ke dalam elemen dengan id #content
//       document.getElementById("body-content").innerHTML = articleHTML;
//     });
// }