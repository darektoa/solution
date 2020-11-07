const idbPromised = idb.open('teams', 1, upgradedB => {
    if(!upgradedB.objectStoreNames.contains('teams_save')){
        let indexTeamSaved = upgradedB.createObjectStore("teams_save",{
            keyPath: "id"
        });
    indexTeamSaved.createIndex("club_name", "team_id", "team_name", "team_position", "team_nationality", "team_role",{
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
        const tx = db.transaction("squads","readwrite");
        let store = tx.objectStore("squads");
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
            const tx = db.transaction("squads", "readwrite");
            tx.objectStore("squads").delete(squadId);
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


