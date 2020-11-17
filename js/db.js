let databases = async () => {
	let db = await idb.open('match-schedule', 1, (upgradeDb) => {
		let matchObjectStore = upgradeDb.createObjectStore('schedule', {
			keyPath: 'match',
			autoIncrement: true,
		});
		matchObjectStore.createIndex('match', 'match', { unique: false });
	});
	return db;
};

let storeData = async (item) => {
	let db = await databases();
	let tx = db.transaction('schedule', 'readwrite');
	let store = tx.objectStore('schedule');
	await store.add(item);
};

let readAllData = async () => {
	let db = await databases();
	let tx = db.transaction('schedule', 'readwrite');
	let store = tx.objectStore('schedule');
	let data = await store.getAll();
	return data;
};

let readData = async (item) => {
	let db = await databases();
	let tx = db.transaction('schedule', 'readwrite');
	let store = tx.objectStore('schedule');
	let data = await store.get(item);
	return data;
};

let deleteData = async (item) => {
	let db = await databases();
	let tx = db.transaction('schedule', 'readwrite');
	let store = tx.objectStore('schedule');
	let data = await store.delete(item);
	return data;
};
