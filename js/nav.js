document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  const loadNav = () => {
    fetch("./nav.html")
      .then((res) => res.text())
      .then((data) => {
        const navs = document.querySelectorAll(".topnav, .sidenav");
        navs.forEach((nav) => {
          nav.innerHTML = data;
        });

        navs.forEach((nav) => {
          nav.addEventListener("click", (e) => {
            M.Sidenav.getInstance(document.querySelector(".sidenav")).close();
            const page = e.target.getAttribute("href").substring(1);
            location.href;
            loadPage(page);
          });
        });
      })
      .catch((err) => console.log(err));
  };

  const loadPage = (page = "home") => {
    fetch(`pages/${page}.html`)
      .then((res) => res.text())
      .then((data) => {
        document.querySelector(".main").innerHTML = data;

        if (page == "home") {
          getMatch();
        } else if (page == "klasemen") {
          getKlasemen();
        } else if (page == "teams") {
          getTeams();
        }
      })
      .catch((err) => console.log(err));
  };

  loadNav();
  loadPage();
});
