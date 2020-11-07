const idbPromised = idb.open('teams', 1, upgradedB => {
    if(!upgradedB.objectStoreNames.contains('teams')){
        let indexTeamSaved = upgradedB.createObjectStore("teams",{
            keyPath: "id"
        });
        
        indexTeamSaved.createIndex("team_id", "id",{
            unique: false,
        });
    }
});

function getAll(){
    return new Promise( resolve,reject => {
        idbPromised.then(db => {
            const tx = db.transaction("teams","readonly");
            return tx.objectStore("teams").getAll();
        }).then(squad => {
           if (squad !== undefined){
            resolve(squad);
        } else {
            reject(new Error("Tim tidak ditemukan"));
        }
        })
    })
};

function dbInsert(squad){
    idbPromised
    .then(db => {
        const tx = db.transaction("teams","readwrite");
        let store = tx.objectStore("teams");
        console.log(squad);
        store.put(squad);
        return tx.complete;
    })
    .then( () => {
        console.log("Artikel berhasil disimpan");
    });
}

function dbDelete(squadId){
    return new Promise((resolve, reject) => {
        idbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            tx.objectStore("teams").delete(squadId);
            return tx;
        }).then (tx => {
            if (tx.complete) {
                resolve(true)
            } else {
                reject(new Error(tx.onerror))
            }
        })
    })
};


