const supabaseUrl =
"https://isuulpqkrpkcysjnulbm.supabase.co";

const supabaseKey =
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdXVscHFrcnBrY3lzam51bGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0OTEwMzIsImV4cCI6MjEwNDA2NzAzMn0.UGiNXfIVIoYR9W6HCB6Ya8TaiN3wJAbiji-1WPBKcm8

var supabaseClient =
window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const year = document.getElementById("year");
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight current navigation section
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Quote form: opens WhatsApp with the project details.
// Replace the number below with your real WhatsApp number.
quoteForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();

  const whatsappNumber = "233201443088";

  const message =
`Hello Nabeng Print Media,

I would like to request a quote.

Name: ${name}
Phone: ${phone}
Service: ${service}
Project details: ${details || "Not provided"}

Works Beyond Quality.`;

  formMessage.textContent = "Opening WhatsApp...";
  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});
