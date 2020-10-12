function databasePromise(idb) {
    var dbPromise = idb.open("db_laliga", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team_favorite")) {
            var indexTeamFavorite = upgradeDb.createObjectStore("team_favorite", {
                keyPath: "id"
            });
            indexTeamFavorite.createIndex("team_name", "name", {
                unique: false
            });
        }
    });

    return dbPromise;
}