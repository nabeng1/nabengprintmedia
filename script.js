/* =========================================================
   NABENG PRINT MEDIA — PREMIUM SITE JAVASCRIPT
========================================================= */

/* ---------------- SUPABASE ---------------- */
const supabaseUrl = "https://ftslcifbzohhgljqcgus.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0c2xjaWZiem9oaGdsanFjZ3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTQ5NjUsImV4cCI6MjA5NTAzMDk2NX0.O6bGKNOdRDH1u2t-MiK8y0ppO-q-P4gggSeDEGsoUrQ";

let supabaseClient = null;
try {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error("Supabase initialization failed:", error);
}

const WHATSAPP_NUMBER = "233201443088";
const ARTWORK_BUCKET = "quote-artwork";

/* ---------------- ELEMENTS ---------------- */
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const year = document.getElementById("year");
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");
const artworkInput = document.getElementById("artwork");
const selectedFile = document.getElementById("selectedFile");
const quoteSubmit = document.getElementById("quoteSubmit");

if (year) year.textContent = new Date().getFullYear();

/* ---------------- HEADER ---------------- */
function updateHeader() {
  if (header) header.classList.toggle("scrolled", window.scrollY > 18);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

/* ---------------- ACTIVE NAV ---------------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a[href^='#']");
if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => navObserver.observe(section));
}

/* ---------------- REVEAL ---------------- */
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

/* ---------------- ANIMATED COUNTERS ---------------- */
const counters = document.querySelectorAll(".counter");
function animateCounter(el) {
  const target = Number(el.dataset.target || 0);
  const duration = 1100;
  const start = performance.now();
  const step = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
if ("IntersectionObserver" in window && counters.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .7 });
  counters.forEach(counter => counterObserver.observe(counter));
} else {
  counters.forEach(counter => counter.textContent = counter.dataset.target || "0");
}

/* ---------------- SERVICE → QUOTE ---------------- */
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const service = link.dataset.service;
    const select = document.getElementById("service");
    if (select && service) select.value = service;
  });
});

/* ---------------- PORTFOLIO FILTER ---------------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioEmpty = document.getElementById("portfolioEmpty");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    let visible = 0;

    portfolioItems.forEach(item => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    if (portfolioEmpty) portfolioEmpty.classList.toggle("show", visible === 0);
  });
});

/* ---------------- FILE PICKER ---------------- */
if (artworkInput) {
  artworkInput.addEventListener("change", () => {
    const file = artworkInput.files?.[0];
    if (!file) {
      if (selectedFile) selectedFile.textContent = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      artworkInput.value = "";
      if (selectedFile) selectedFile.textContent = "Please choose a JPG, PNG or PDF file.";
      return;
    }
    if (file.size > maxSize) {
      artworkInput.value = "";
      if (selectedFile) selectedFile.textContent = "File is too large. Maximum size is 5MB.";
      return;
    }
    if (selectedFile) selectedFile.textContent = `Attached: ${file.name} (${formatBytes(file.size)})`;
  });
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ---------------- ARTWORK UPLOAD ---------------- */
async function uploadArtwork(file, requestId) {
  if (!supabaseClient || !file || !requestId) return null;

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${requestId}/${Date.now()}-${safeName}`;

  const { error } = await supabaseClient.storage
    .from(ARTWORK_BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) {
    console.warn("Artwork upload skipped:", error.message);
    return null;
  }

  const { data } = supabaseClient.storage
    .from(ARTWORK_BUCKET)
    .getPublicUrl(path);

  return data?.publicUrl || null;
}

/* ---------------- WHATSAPP ---------------- */
function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ---------------- QUOTE FORM ---------------- */
if (quoteForm) {
  quoteForm.addEventListener("submit", async event => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const serviceInput = document.getElementById("service");
    const detailsInput = document.getElementById("details");
    const file = artworkInput?.files?.[0] || null;

    const name = nameInput?.value.trim() || "";
    const phone = phoneInput?.value.trim() || "";
    const service = serviceInput?.value.trim() || "";
    const details = detailsInput?.value.trim() || "";

    if (!name) return showFormMessage("Please enter your name.", true, nameInput);
    if (!phone) return showFormMessage("Please enter your phone number.", true, phoneInput);
    if (!service) return showFormMessage("Please select a service.", true, serviceInput);

    if (!supabaseClient) {
      showFormMessage("Our quote system is temporarily unavailable. Please use WhatsApp instead.", true);
      return;
    }

    if (quoteSubmit) {
      quoteSubmit.disabled = true;
      quoteSubmit.innerHTML = "Sending request…";
    }
    showFormMessage("Sending your quote request…", false);

    try {
      /* Keep the database insert compatible with the existing quote_requests table. */
      const { data, error } = await supabaseClient
        .from("quote_requests")
        .insert([{ name, phone, service, details, status: "pending" }])
        .select()
        .single();

      if (error) throw error;

      let artworkUrl = null;
      if (file && data?.id) {
        artworkUrl = await uploadArtwork(file, data.id);
      }

      const message = `Hello Nabeng Print Media,

I would like to request a quote.

Name: ${name}
Phone: ${phone}
Service: ${service}
Project details: ${details || "Not provided"}${artworkUrl ? `\nArtwork/reference: ${artworkUrl}` : file ? "\nArtwork: Attached on the website." : ""}

I have also submitted this request through your website.

Works Beyond Quality.`;

      showFormMessage(
        artworkUrl
          ? "Quote received. Your artwork was uploaded successfully. Opening WhatsApp…"
          : "Quote received. Opening WhatsApp…",
        false
      );

      quoteForm.reset();
      if (selectedFile) selectedFile.textContent = "";
      openWhatsApp(message);
    } catch (error) {
      console.error("Quote request error:", error);
      showFormMessage("We could not save your request. Please try again or contact us on WhatsApp.", true);
    } finally {
      if (quoteSubmit) {
        quoteSubmit.disabled = false;
        quoteSubmit.innerHTML = "Request a Quote <span>↗</span>";
      }
    }
  });
}

function showFormMessage(message, isError = false, focusElement = null) {
  if (formMessage) {
    formMessage.textContent = message;
    formMessage.style.color = isError ? "#d92d20" : "#667085";
  }
  if (focusElement) focusElement.focus();
}

/* ---------------- CONTACT SHORTCUTS ---------------- */
window.NabengPrintMedia = {
  openWhatsApp,
  uploadArtwork
};

console.log("Nabeng Print Media premium site loaded.");
