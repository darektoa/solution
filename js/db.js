var dbPromised = idb.open("info-bola", 2, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("tim", {
      keyPath: "ID"
    });
    articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
  });
function saveForLater(data) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(data);
        store.add(data.result);
        return tx.complete;
    })
    .then(function() {
        console.log("Artikel berhasil di simpan.");
    });
}
function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      return store.getAll();
    })
    .then(function(teams) {
      resolve(teams);
    });
  });
}
function deleteForLater(data) {
  dbPromise
  .then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
        store.delete('123456789');
    return tx.complete;
    }).then(function() {
        console.log('Item deleted');
  });
}