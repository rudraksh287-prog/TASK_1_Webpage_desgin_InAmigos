
"use strict";

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

const hamburger = document.getElementById("hamburger");
const navMenu   = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  const open = hamburger.classList.toggle("open");
  navMenu.classList.toggle("open", open);
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(p => p.classList.add("hidden"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

let countersDone = false;

function runCounters() {
  if (countersDone) return;
  countersDone = true;
  document.querySelectorAll(".counter").forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const val = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
      el.textContent = val.toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("en-IN");
    }
    requestAnimationFrame(step);
  });
}

const impactObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { runCounters(); impactObs.disconnect(); }
}, { threshold: 0.3 });

const impactSection = document.getElementById("impact");
if (impactSection) impactObs.observe(impactSection);