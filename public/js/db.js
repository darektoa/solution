const dbPromised = idb.open("info-bola", 1, (upgradeDb) => {
  const articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("id_teams", "id", { unique: false });
});



// FUNCTION UNTUK ADD TEAM TO INDEXED DB
function saveById(team) {
  return new Promise((resolve, reject) => {
    dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.put(team);
      return tx.complete;
    })
    .then(() => {
      M.toast({html: 'Saved', classes: "green darken-3", displayLength: 1000})
      resolve('Saved');
    });
  })
}



// FUNCTION UNTUK DELETE TEAM DARI INDEXED DB
function deleteById(item) {
  return new Promise((resolve, reject) => {
    dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      var confirm = window.confirm(`Yakin Ingin Hapus ${item.name}?`);
      
      if(confirm){
        store.delete(item.id)
        return tx.complete;
      } else{
        reject('Canceled');
      }
    })
    .then(() => {
      resolve('Deleted');
    })
  })
}



// FUNCTIOn UNTUK MENGAMBIL SEMUA TEAM DARI INDEXED DB
function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      resolve(store.getAll());
    })
  });
}



// FUNCTIOn UNTUK MENGAMBIL DATA TEAM PER ID DARI INDEXED DB
function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      var idTeam = Number(id);
      resolve(store.get(idTeam));
    })
  });
}