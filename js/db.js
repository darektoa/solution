//penamaan objectStore samakan dengan transaction getAll,Insert,delete
const idbPromised = idb.open('teams', 1, upgradedB => {
    if(!upgradedB.objectStoreNames.contains('teams_save')){
        let indexTeamSaved = upgradedB.createObjectStore("teams_save",{
            keyPath: "id"
        });
        
        indexTeamSaved.createIndex("team_id", "id", {
        unique: false,
    });
    }
});

function getAll(){
    return idbPromised.then(db => {
        const tx = db.transaction("teams_save","readonly")
        return tx.objectStore("teams_save").getAll()
    }).then(teams => {
        console.log('Success get all teams')
        return teams
    })
}

function dbInsert(squad){
    idbPromised
    .then(db => {
        const tx = db.transaction("teams_save","readwrite");
        let store = tx.objectStore("teams_save");
        console.log(squad);
        store.put(squad);
        return tx.complete;
    })
    .then( () => {
        console.log("Artikel berhasil disimpan");
    });
}

function dbDelete(idTeam){
    return idbPromised.then(db => {
        const tx = db.transaction("teams_save","readonly")
        return tx.objectStore("teams_save").delete(idTeam)
    }).then(teams => {
        console.log('Team berhasil di hapus')
        return teams
    })
}


