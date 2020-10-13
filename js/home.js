document.addEventListener("DOMContentLoaded", function() {
  var para = document.querySelectorAll(".parallax");
  var int = M.Parallax.init(para);
  console.log(para, int);
});
