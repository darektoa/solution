const idbPromised = idb.open('teams', 1, upgradedB => {
    if(!upgradedB.objectStoreNames.contains('teams_save')){
        let indexTeamSaved = upgradedB.createObjectStore("teams_save",{
            keyPath: "id"
        });
    indexTeamSaved.createIndex("team_name", "team_name",{
        unique: false,
    });
    }
});

function getAll(){
    return new Promise( resolve,reject => {
        idbPromised.then(db => {
            const tx = db.transaction("teams","readonly");
            return tx.objectStore("teams").getAll();
        }).then(team => {
           if (team !== undefined){
            resolve(team);
        } else {
            reject(new Error("Tim tidak ditemukan"));
        }
        })
    })
};

function dbInsert(team){
    idbPromised
    .then(db => {
        const tx = db.transaction("teams","readwrite");
        let store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
    })
    .then( () => {
        console.log("Artikel berhasil disimpan");
    });
}

function dbDelete(teamId){
    return new Promise((resolve, reject) => {
        idbPromised
        .then(db => {
            const tx = db.transaction("teams", "readwrite");
            tx.objectStore("teams").delete(teamId);
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


