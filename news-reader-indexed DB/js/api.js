let base_url = "https://readerapi.codepolitan.com/";

//Blok kode yang akan dipanggil jika fetch berhasil
function status(response){
    if(response.status !==200){
        console.log("Error : " + response.status);
        //Method reject() akan membuat block catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        //Mengubah suatu objek menjadi Promise agar bisa di "then-kan"
        return Promise.resolve(response);
    }
}

//Blok kode untuk memparsing json menjadi array Javascript
function json(response){
    return response.json();
}

//Blok kode untuk meng-handle kesalah block catch
function error(error){
    //Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}


//untuk memuat data dari cache terlebih dahulu sebelum melakukan request ke server api
function getArticles() {
    if ("caches" in window) {
        caches.match(base_url + "articles").then(response => {
            if(response){
                response.json().then(data =>{
                    let articlesHTML = "";
                    data.result.forEach(article =>{
                        articlesHTML += `
                        <div class="card">
                            <a href="./article.html?id=${article.id}">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="${article.thumbnail}" />
                            </div>
                            </a>
                            <div class="card-content">
                            <span class="card-title truncate">${article.title}</span>
                            <p>${article.description}</p>
                            </div>
                        </div>
                        `;
                    });
                    //Sisipkan komponen card ke dalam id content
                    document.getElementById("articles").innerHTML = articlesHTML;
                });
            }
        });
    }

    fetch(base_url + "articles")
        .then(status)
        .then(json)
        .then(data =>{
        // Objek/array javascript dari response.json() masuk lewat data.

        //Menyusun komponen card artikel secara dinamis
        let articlesHTML = "";
        data.result.forEach(article =>{
            articlesHTML += `
            <div class="card">
              <a href="./article.html?id=${article.id}">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${article.thumbnail}" />
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate">${article.title}</span>
                <p>${article.description}</p>
              </div>
            </div>
          `;
            
        });
        //Sisipkan komponen card ke dalam id content
        document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

//menambahkan fungsi untuk mengunduh detail artikel
function getArticleById() {
    return new Promise(function (resolve,reject){
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(base_url + "article/" + idParam).then(response => {
          if (response) {
            response.json().then(data => {
              let articleHTML = `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${data.result.cover}" />
                  </div>
                  <div class="card-content">
                    <span class="card-title">${data.result.post_title}</span>
                    ${snarkdown(data.result.post_content)}
                  </div>
                </div>
              `;
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("body-content").innerHTML = articleHTML;
              resolve(data);
            });
          }
        });
      }

    fetch(base_url + "article/" + idParam)
        .then(status)
        .then(json)
        .then(data =>{
        //Objek Javascript dari response.json() masuk lewat variabel data.
        console.log(data);
        //Menyusun komponen card artikel secara dinamis
        let articleHTML = `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
                </div>
                <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
                </div>
            </div>
        `;

        //Fungsi snarkdown() di atas berasal dari library Snarkdown yang telah diimpor  di berkas article.html
        //Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("body-content").innerHTML = articleHTML;
        resolve(data);
    });
  }
)};

function getSavedArticles(){
  getAll().then(articles =>{
    console.log(articles);
    //Menyusun komponen artikel secara dinamis
    let articlesHTML ="";
    articles.forEach(article =>{
      let description = article.post_content.substring(0,100);
      articlesHTML += `
            <div class="card">
              <a href="./article.html?id=${article.ID}&saved=true">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${article.cover}" />
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate">${article.post_title}</span>
                <p>${description}</p>
              </div>
            </div>
          `;
    });
      //Sisipkan komponen card kedalam elemen dengan id #body-content
      document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById(){
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(article =>{
    articleHTML = '';
    let articleHTML = `
      <div class= "card>
      <div class="card-image waves-effect waves-block waves-light">
      <img src="${article.cover}" />
      </div>
      <div class="card-content">
      <span class="card-title">${article.post_title}</span>
      ${snarkdown(article.post_content)}
      </div>
      </div>
    `;
    //Sisipkan komponen card kedalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articleHTML;
  })
}

