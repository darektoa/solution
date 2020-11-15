var dbPromised = idb.open("info-bola", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("id_teams", "id", { unique: false });
});

  
function saveForLater(data) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(data);
        store.put(data);
        return tx.complete;
    })
    .then(function() {
        alert("Artikel berhasil di simpan.");
    });
}


function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      return store.getAll();
    }).then(function(teams) {
      resolve(teams);
    });
  });
}


function getById(id) {
  return new Promise(function(resolve, reject) {
    const idTeam = Number(id);

    dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      return store.get(idTeam);
    }).then(function(team) {
      resolve(team);
    });
  });
}


function deleteForLater(id) {
  const idTeam = Number(id);

  dbPromised
  .then(function(db) {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
        store.delete(idTeam);
    return tx.complete;
  }).then(function() {
        alert('Item deleted');
        window.location = '/#saved';
  });
}