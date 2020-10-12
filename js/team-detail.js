document.addEventListener("DOMContentLoaded", function () {
  if ("indexedDB" in window) {
    var urlParams = new URLSearchParams(window.location.search);
    var id = Number(urlParams.get("id"));

    var isFavorite = false;

    cekData("team_favorite", id)
      .then(msg => {
        document.getElementById("iconFav").innerHTML = "favorite";
        getSavedDataById("team");
        isFavorite = true;
      })
      .catch(msg => {
        document.getElementById("iconFav").innerHTML = "favorite_border";
        getDetailTeam();
        isFavorite = false;
      });

    var isFavorite = document.getElementById("iconFav");

    isFavorite.onclick = function () {
      if (isFavorite) {
        deleteData("team_favorite", id);
        isFavorite = false;
      } else {
        item = getDetailTeam();
        item.then(function (team) {
          saveData("team", team);
        });
        isFavorite = true;
      }
    };
  }
},
false
);