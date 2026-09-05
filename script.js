

/* =========================================================
   NABENG PRINT MEDIA
   Main JavaScript
========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const supabaseUrl =
"https://ftslcifbzohhgljqcgus.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0c2xjaWZiem9oaGdsanFjZ3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTQ5NjUsImV4cCI6MjA5NTAzMDk2NX0.O6bGKNOdRDH1u2t-MiK8y0ppO-q-P4gggSeDEGsoUrQ";


var supabaseClient =
window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);


/* =========================================================
   GET HTML ELEMENTS
========================================================= */

const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const year = document.getElementById("year");
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

if (header) {

    const updateHeader = () => {
        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    };

    window.addEventListener("scroll", updateHeader);

    // Run once when page loads
    updateHeader();
}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

if (mobileMenu) {

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });

}


/* =========================================================
   HIGHLIGHT CURRENT NAVIGATION SECTION
========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navLinks = document.querySelectorAll(
    ".desktop-nav a"
);

if (
    sections.length > 0 &&
    navLinks.length > 0 &&
    "IntersectionObserver" in window
) {

    const navObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        const href =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            href === `#${entry.target.id}`
                        );

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        navObserver.observe(section);
    });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for browsers without IntersectionObserver

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================================
   QUOTE FORM → WHATSAPP
========================================================= */

if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /* ---------------------------------------------
               GET FORM VALUES
            --------------------------------------------- */

            const nameInput =
                document.getElementById("name");

            const phoneInput =
                document.getElementById("phone");

            const serviceInput =
                document.getElementById("service");

            const detailsInput =
                document.getElementById("details");


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";

            const service =
                serviceInput
                    ? serviceInput.value
                    : "";

            const details =
                detailsInput
                    ? detailsInput.value.trim()
                    : "";


            /* ---------------------------------------------
               BASIC VALIDATION
            --------------------------------------------- */

            if (!name) {

                if (formMessage) {
                    formMessage.textContent =
                        "Please enter your name.";
                }

                if (nameInput) {
                    nameInput.focus();
                }

                return;
            }


            if (!phone) {

                if (formMessage) {
                    formMessage.textContent =
                        "Please enter your phone number.";
                }

                if (phoneInput) {
                    phoneInput.focus();
                }

                return;
            }


            if (!service) {

                if (formMessage) {
                    formMessage.textContent =
                        "Please select a service.";
                }

                if (serviceInput) {
                    serviceInput.focus();
                }

                return;
            }


            /* ---------------------------------------------
               WHATSAPP NUMBER
            --------------------------------------------- */

            const whatsappNumber =
                "233201443088";


            /* ---------------------------------------------
               WHATSAPP MESSAGE
            --------------------------------------------- */

            const message =
`Hello Nabeng Print Media,

I would like to request a quote.

Name: ${name}
Phone: ${phone}
Service: ${service}
Project details: ${details || "Not provided"}

Works Beyond Quality.`;


            /* ---------------------------------------------
               SHOW MESSAGE
            --------------------------------------------- */

            if (formMessage) {
                formMessage.textContent =
                    "Opening WhatsApp...";
            }


            /* ---------------------------------------------
               OPEN WHATSAPP
            --------------------------------------------- */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   DEBUG MESSAGE
========================================================= */

console.log(
    "Nabeng Print Media JavaScript loaded successfully."
);

if (supabase) {

    console.log(
        "Supabase client initialized successfully."
    );

} else {

    console.warn(
        "Supabase client was not initialized. Check your Supabase library and API key."
    );

}
