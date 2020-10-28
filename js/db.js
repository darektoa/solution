var dbPromised = idb.open("serieaitaly", 1, function(upgradeDb) {
  var playersObjectStore = upgradeDb.createObjectStore("players", {
    keyPath: "ID"
  });
  playersObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(player) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("players", "readwrite");
      var store = tx.objectStore("players");
      console.log(player);
      store.add(player.result);
      return tx.complete;
    })
    .then(function() {
      console.log("Data Pemain berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("players", "readonly");
        var store = tx.objectStore("players");
        return store.getAll();
      })
      .then(function(players) {
        resolve(players);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("players", "readonly");
        var store = tx.objectStore("players");
        return store.get(id);
      })
      .then(function(player) {
        resolve(player);
      });
  });
}
