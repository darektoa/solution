var dbPromised = idb.open("info-bola", 1, function(upgradeDb){
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
       keyPath: "id" 
    });
    articlesObjectStore.createIndex("id_team", "id", {unique: false});
});

function saveForLater(article){
    dbPromised
    .then(function(db){
        var tx = db.transaction("articles", "readwrite");
        var store = tx.objectStore("articles");
        
        store.put(article);
        return tx.complete;
    })
    .then(function(){
        console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("articles", "readonly");
          var store = tx.objectStore("articles");
          return store.get(id);
        })
        .then(function(article) {
          resolve(article);
        });
    });
  }