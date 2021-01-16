import "core-js/stable";

//

// Author: Sergi. J
// Date:Dec, 2020

//

("use strict");

////////////////////////////////////////////////////////
// Selecting
////////////////////////////////////////////////////////
const nav = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__link");

const hamBtn = document.querySelector(".nav__ham-btn");
const hamBtnIcon = document.querySelector(".nav__ham-btn").firstElementChild;

const brand = document.querySelector(".nav__brand");

const searchBtn = document.querySelector(".nav__search-btn");
const searchBtnIcon = document.querySelector(".nav__search-btn")
  .firstElementChild;

const searchBar = document.querySelector(".nav__search");
const searchTxt = document.querySelector(".nav__search__text");
const sliderContainer = document.querySelector(".slider");

const main = document.querySelector("main");
const footer = document.querySelector("footer");

const tabs = document.querySelectorAll(".block__tab");
const tabsContainer = document.querySelectorAll(".block__tab-container");
const tabsContent = document.querySelectorAll(".block__content");

////////////////////////////////////////////////////////
// Reveal Sections When Scrolling
////////////////////////////////////////////////////////

const allSec = document.querySelectorAll("section");

const revealSec = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove("section--hidden");
};

const secObserver = new IntersectionObserver(revealSec, {
  root: null,
  threshold: 0.15,
});

allSec.forEach(function (sec) {
  secObserver.observe(sec);
  sec.classList.add("section--hidden");
});

////////////////////////////////////////////////////////
// Hamurger Menu
////////////////////////////////////////////////////////

const showNav = function () {
  nav.classList.toggle("nav__menu--show");
  hamBtnIcon.classList.toggle("fa-times");
  hamBtn.classList.toggle("active");
  sliderContainer.classList.toggle("passive");
  brand.classList.toggle("passive");
  searchBtn.classList.toggle("passive");
  main.classList.toggle("passive");
  footer.classList.toggle("passive");
};

hamBtn.addEventListener("click", showNav);
navLinks.forEach((link) => link.addEventListener("click", showNav));

////////////////////////////////////////////////////////
// Search Bar
////////////////////////////////////////////////////////

const showSearch = function () {
  searchBar.classList.toggle("nav__search--show");
  searchBtnIcon.classList.toggle("fa-times");
  searchBtn.classList.toggle("active");
  hamBtn.classList.toggle("invisible");
  brand.classList.toggle("invisible");
};

searchBtn.addEventListener("click", showSearch);

////////////////////////////////////////////////////////

document.addEventListener("click", function (ev) {
  if (
    !ev.target.closest(".nav__menu") &&
    hamBtnIcon.classList.contains("fa-times") &&
    !ev.target.closest(".nav__ham-btn")
  ) {
    showNav();
  } else if (
    !ev.target.closest(".search") &&
    searchBtnIcon.classList.contains("fa-times") &&
    !ev.target.closest(".nav__search-btn") &&
    ev.target !== searchTxt
  ) {
    showSearch();
  }
});

////////////////////////////////////////////////////////
// Slider
////////////////////////////////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  let touchendX = 0;
  let touchstartX = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const handleGesture = function () {
    if (touchendX < touchstartX) nextSlide();
    if (touchendX > touchstartX) prevSlide();
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  sliderContainer.addEventListener(
    "touchstart",
    (e) => (touchstartX = e.changedTouches[0].screenX)
  );

  sliderContainer.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

////////////////////////////////////////////////////////
// Tabbed Movies
////////////////////////////////////////////////////////

tabsContainer.forEach(function (tabsBox) {
  tabsBox.addEventListener("click", function (e) {
    const clicked = e.target.closest(".block__tab");
    const clickedContent = document.querySelector(
      `.block__content--${clicked.dataset.tab}`
    );
    const tabContentSiblings = Array.from(
      document.querySelector(`.block__content--${clicked.dataset.tab}`)
        .parentNode.children
    ).slice(2);
    const tabSiblings = Array.from(e.target.parentNode.children);

    if (!clicked) return;

    tabSiblings.forEach((tb) => tb.classList.remove("block__tab--active"));

    tabContentSiblings.forEach((cnt) =>
      cnt.classList.remove("block__content--active")
    );

    clicked.classList.add("block__tab--active");

    clickedContent.classList.add("block__content--active");
  });
});

////////////////////////////////////////////////////////
// Smooth Scrolling
////////////////////////////////////////////////////////

nav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

////////////////////////////////////////////////////////
