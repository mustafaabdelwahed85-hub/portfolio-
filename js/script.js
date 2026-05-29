const roles = [
  "Software Developer",
  "Frontend Developer",
  ".NET Developer",
  "Python Developer",
  "Coding Instructor"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");
const header = document.getElementById("header");
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const reveals = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");

function typingEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typing.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typingEffect, 1200);
      return;
    }
  } else {
    typing.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex++;

      if (roleIndex === roles.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typingEffect, deleting ? 45 : 90);
}

function handleScroll() {
  if (window.scrollY > 70) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  sections.forEach((section) => {
    const top = section.offsetTop - 160;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (window.scrollY >= top && window.scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });

  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < windowHeight - 90) {
      item.classList.add("show");
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeBtn.textContent = isLight ? "🌙" : "☀️";

  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "🌙";
  } else {
    themeBtn.textContent = "☀️";
  }
}

function toggleMenu() {
  navMenu.classList.toggle("open");
}

function closeMenu() {
  navMenu.classList.remove("open");
}

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

themeBtn.addEventListener("click", toggleTheme);
menuBtn.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", handleScroll);

loadTheme();
typingEffect();
handleScroll();