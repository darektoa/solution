var dbPromised = idb.open("serieaitaly", 1, function(upgradeDb) {
  var playersObjectStore = upgradeDb.createObjectStore("players", {
    keyPath: "id"
  });
  playersObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(player) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("players", "readwrite");
      var store = tx.objectStore("players");
      console.log(player);
      store.put(player);
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

const dbDeletePlayer = playerId => {
  return new Promise((resolve, reject) => {
      idbPromised.then(db => {
          const transaction = db.transaction("players", `readwrite`);
          transaction.objectStore("players").delete(playerId);
          return transaction;
      }).then(transaction => {
          if (transaction.complete) {
              resolve(true)
          } else {
              reject(new Error(transaction.onerror))
          }
      })
  })
};
