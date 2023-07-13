let header = document.querySelector('.header');
let hamburgerMenu = document.querySelector('.hamburger-menu');

window.addEventListener('scroll', function(){
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('active', windowPosition)
});

hamburgerMenu.addEventListener('click', function (){
    header.classList.toggle('menu-open');
})

// for log in maybe
const btn = document.getElementById("signInButton");
const username = document.getElementById("input-username");
const password = document.getElementById("input-password");

btn.addEventListener('click', function (){
    // TODO: link log in condition to database side (?)
    if (username.value.trim() == "asd" && password.value.trim() == "asd") {
        location.href ="./HomePage.html"
    }
})
