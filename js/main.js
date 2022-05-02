(() => {
  const footerLink = document.getElementById("footer__nav");
  const footer = document.querySelector(".footer");
  const navigation = document.querySelectorAll("nav li");
  const navLink = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".section");
  let viewPort = document.documentElement.clientHeight;
  let documentScroll = window.pageYOffset;

  window.addEventListener(`resize`, () => {
      viewPort = document.documentElement.clientHeight;
    },
    true
  );

  function addClasses(i) {
    navigation[i].querySelector("a").classList.add("active-anchor");
  }

  function removeClass() {
    navLink.forEach((el) => {
      if (el.classList.contains("active-anchor")) {
        el.classList.remove("active-anchor");
      }
    });
  }

  function addClassFooter() {
    footerLink.classList.add("active-anchor");
  }

  function calculation(){
    sections.forEach((el, i) => {
      const getBounding = el.getBoundingClientRect()
      const targetPosition = {
          top: documentScroll + getBounding.top,
          bottom: documentScroll + getBounding.bottom,
        },
        windowPosition = {
          top: documentScroll,
          bottom: documentScroll + viewPort,
        };
      const footerPosition =
        documentScroll + footer.getBoundingClientRect().bottom;

      if (footerPosition < windowPosition.bottom) {
        removeClass();
        addClassFooter();
      } else if (
        targetPosition.bottom + viewPort / 2 > windowPosition.top &&
        targetPosition.top + viewPort / 2 < windowPosition.bottom
      ) {
        removeClass();
        addClasses(i);
      }
    });
  }


  window.addEventListener("scroll", () => {
    documentScroll = window.pageYOffset;
    calculation()

  });
})();

//////////////////////////////////////SLIDER FUNCTION///////////////////////////////////////////////////////////////

(() => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".models__slider-box .models__item");

  const next = document.getElementById("next");
  const previous = document.getElementById("prev");

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  setInterval(nextSlide, 5000);

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  function goToSlide(n) {
    slides[currentSlide].className = "models__item";
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = "models__item showing";
  }

  next.onclick = function () {
    nextSlide();
  };
  previous.onclick = function () {
    previousSlide();
  };
})();

//////////////////////////////////////SCROLL FUNCTION///////////////////////////////////////////////////////////////

(() => {
  const navLink = document.querySelector(".nav__list");
  const anchors = navLink.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
})();
