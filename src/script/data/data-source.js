class DataSource {
    static standing() { // ambil standings
        const url_base = `https://api.football-data.org/v2/competitions/PL/standings?standingType=TOTAL`;
        // const url_base = `https://covid19.mathdro.id/api/countries/indonesia/confirmed`;
        return fetch(`${url_base}`, { method: 'GET', headers: { 'X-Auth-Token': 'c9cf7c7708664979be5a7b83e53a7263' } })//
            .then(response => response.json())

    }
    static scheduled() { // ambil semua jadwal
        const url_base = `https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED`;
        // const url_base = `https://covid19.mathdro.id/api/countries/indonesia/confirmed`;
        return fetch(`${url_base}`, { method: 'GET', headers: { 'X-Auth-Token': 'c9cf7c7708664979be5a7b83e53a7263' } }) //
            .then(response => response.json());
    }

    static teamById(idParam) { // ambil team by ID
        const url_base = "https://api.football-data.org/v2/teams/";
        // const url_base = `https://covid19.mathdro.id/api/countries/indonesia/confirmed`;
        return fetch(`${url_base}${idParam}`, { method: 'GET', headers: { 'X-Auth-Token': 'c9cf7c7708664979be5a7b83e53a7263' } })
            .then(response => response.json());
    }

    static scheduleByIdj(idjParam) { // ambil jadwal by ID
        const url_base = "https://api.football-data.org/v2/matches/";
        // const url_base = `https://covid19.mathdro.id/api/countries/indonesia/confirmed`;
        return fetch(`${url_base}${idjParam}`, { method: 'GET', headers: { 'X-Auth-Token': 'c9cf7c7708664979be5a7b83e53a7263' } })
            .then(response => response.json());
    }

    static nextMatch(from, to) {
        const url_base = "https://api.football-data.org/v2/competitions/PL/matches?";
        //dateFrom=2020-10-11&dateTo=2020-10-20";
        return fetch(`${url_base}dateFrom=${from}&dateTo=${to}`, { method: 'GET', headers: { 'X-Auth-Token': 'c9cf7c7708664979be5a7b83e53a7263' } })
            .then(response => response.json());
    }

}
export default DataSource;

