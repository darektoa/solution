var base_url = "https://api.football-data.org/v2/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    
    return Promise.reject(new Error(response.statusText));
  } else {
    
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  
  console.log("Error : " + error);
}
//request data Json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "teams")
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.teams.forEach(function(article) {
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.name}</span>
                      <p>${article.venue}</p>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "teams",{
    headers: {
      'X-Auth-Token': '41f6f1c817d14d6ea36e513375498e72'
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function(article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.name}</span>
                  <p>${article.venue}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {

            console.log(data);
            var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                ${snarkdown(data.venue)}
              </div>
            </div>
          `;
            
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
      fetch(base_url + "teams/" + idParam, {
      headers: {
        'X-Auth-Token': '41f6f1c817d14d6ea36e513375498e72'
      },
    })
        .then(status)
        .then(json)
        .then(function(data) {
          // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
          // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                ${snarkdown(data.venue)}
              </div>
            </div>
          `;
          
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
          // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          resolve(data);
      })
  });
} 

function getSavedArticles(){
  getAll().then(function(teams){
    console.log(teams);

    var articlesHTML = "";
    teams.forEach(function(article){
      var description = article.post_content.substring(0, 100);
      articlesHTML += `
      <div class="card">
      <a href="./article.html?id=${article.ID}&saved=true">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${article.crestUrl}" />
        </div>
      </a>
      <div class="card-content">
        <span class="card-title truncate">${article.name}</span>
        <p>${description}</p>
      </div>
    </div>
      `;

    });

    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(article) {
    articleHTML = '';
    var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${article.name}</span>
        ${snarkdown(article.venue)}
      </div>
    </div>
  `;
    
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}