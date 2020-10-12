function klasemen(data) {

    var dataTableKlasemen = ''

    data.standings.forEach(function (dataKlasemen) {

        if (dataKlasemen.type == "TOTAL") {

            dataKlasemen.table.forEach(function (club) {

                //Replace http to https
                club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));

                dataTableKlasemen += `<tr>
                    <td class="center-align">${club.position}</td>
                    <td>
                        <a href="./team_detail.html?id=${club.team.id}">
                            <p class="hide-on-small-only">
                                <img class = "responsive-img show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                                ${club.team.name}
                            </p>
                            <p class="hide-on-med-and-up">
                                <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
                            </p>
                        </a>
                    </td>
                    <td class="center-align">${club.playedGames}</td>
                    <td class="center-align">${club.won}</td>
                    <td class="center-align">${club.draw}</td>
                    <td class="center-align">${club.lost}</td>
                    <td class="center-align">${club.goalsFor}</td>
                    <td class="center-align">${club.goalsAgainst}</td>
                    <td class="center-align">${club.goalDifference}</td>
                    <td class="center-align">${club.points}</td>
                </tr>`
            })
        }

    });

    // Sisipkan komponen card ke dalam elemen dengan id tabelKlasemen
    document.getElementById("table_klasemen").innerHTML = dataTableKlasemen;
}