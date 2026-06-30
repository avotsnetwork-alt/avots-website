const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");

const links = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 28);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("lock");
}

menu.addEventListener("click", () => {
  const isOpen = menu.getAttribute("aria-expanded") === "true";

  menu.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("lock", !isOpen);
});

links.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55%" }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}
