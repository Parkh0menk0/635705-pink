var nav = document.querySelector(".main-nav");
var toggle = document.querySelector(".main-nav__toggle");

nav.classList.remove("main-nav--nojs");

toggle.addEventListener("click", function (evt) {
  evt.preventDefault;
  if(nav.classList.contains("main-nav--closed")) {
    nav.classList.remove("main-nav--closed");
    nav.classList.add("main-nav--opened");
    this.classList.remove("main-nav__toggle--opened");
    this.classList.add("main-nav__toggle--closed");
  } else {
    nav.classList.remove("main-nav--opened");
    nav.classList.add("main-nav--closed");
    this.classList.remove("main-nav__toggle--closed");
    this.classList.add("main-nav__toggle--opened");
  }
});
