//Membuat database
let dbPromised = idb.open("news-reader", 1 , upgradeDb =>{
    let articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "ID" 
    });
    articlesObjectStore.createIndex("post_title", "post_title", {unique: false})
});

function saveForLater(article){
    dbPromised
    .then(db => {
      let tx = db.transaction("articles", "readwrite");
      let store = tx.objectStore("articles");
      console.log(article);
      store.add(article.result);
      return tx.complete;
    })
    .then( () =>{
        console.log("Artikel berhasil disimpan");
    });
}

function getAll(){
    return new Promise(function (resolve,reject){
       dbPromised
       .then(db =>{
         let tx = db.transaction("articles","readonly");
         let store = tx.objectStore("articles");
         return store.getAll();
       })
       .then(articles =>{
           resolve(articles);
       });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(db => {
          let tx = db.transaction("articles", "readonly");
          let store = tx.objectStore("articles");
          return store.get(id);
        })
        .then(article => {
          resolve(article);
        });
    });
  }