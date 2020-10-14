const input = document.querySelector("input#hp")
const submit = document.querySelector("button#submit");

//fungsi ini bekerja ketika input hp masih kosong kemudian klik button submit maka form hp akan 
//bergetar
submit.addEventListener("click", (e) => {
    e.preventDefault();
    if(input.value === "") {
        input.classList.add("apply-shake");
    }
});

input.addEventListener("animationend", (e) => {
    input.classList.remove("apply-shake");
});
