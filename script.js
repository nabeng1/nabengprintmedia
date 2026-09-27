/* =========================================================
   NABENG PRINT MEDIA — PREMIUM SITE JAVASCRIPT
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const supabaseUrl =
  "https://ftslcifbzohhgljqcgus.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdXVscHFrcnBrY3lzam51bGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0OTEwMzIsImV4cCI6MjEwNDA2NzAzMn0.UGiNXfIVIoYR9W6HCB6Ya8TaiN3wJAbiji-1WPBKcm8";

let supabaseClient = null;

try {

  if (window.supabase) {

    supabaseClient =
      window.supabase.createClient(
        supabaseUrl,
        supabaseKey
      );

  }

} catch (error) {

  console.error(
    "Supabase initialization failed:",
    error
  );

}


/* =========================================================
   GLOBAL SETTINGS
========================================================= */

const WHATSAPP_NUMBER = "233201443088";

const ARTWORK_BUCKET = "quote-artwork";


/* =========================================================
   ELEMENTS
========================================================= */

const header =
  document.getElementById("siteHeader");

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");

const year =
  document.getElementById("year");

const quoteForm =
  document.getElementById("quoteForm");

const formMessage =
  document.getElementById("formMessage");

const artworkInput =
  document.getElementById("artwork");

const selectedFile =
  document.getElementById("selectedFile");

const quoteSubmit =
  document.getElementById("quoteSubmit");


/* =========================================================
   YEAR
========================================================= */

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {

  if (header) {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 18
    );

  }

}

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && mobileMenu) {

  menuToggle.addEventListener(
    "click",
    () => {

      const open =
        mobileMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      document.body.classList.toggle(
        "menu-open",
        open
      );

    }
  );


  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove(
            "open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.classList.remove(
            "menu-open"
          );

        }
      );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".desktop-nav a[href^='#']"
  );


if (
  "IntersectionObserver" in window &&
  sections.length &&
  navLinks.length
) {

  const navObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach(link => {

            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
              `#${entry.target.id}`
            );

          });

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(section => {

    navObserver.observe(section);

  });

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
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
        threshold: 0.10
      }
    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(element => {

    element.classList.add("visible");

  });

}


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

const counters =
  document.querySelectorAll(".counter");


function animateCounter(element) {

  const target =
    Number(
      element.dataset.target || 0
    );

  const duration = 1100;

  const start =
    performance.now();


  const step = now => {

    const progress =
      Math.min(
        (now - start) / duration,
        1
      );

    const eased =
      1 - Math.pow(
        1 - progress,
        3
      );


    element.textContent =
      Math.round(
        target * eased
      );


    if (progress < 1) {

      requestAnimationFrame(step);

    }

  };


  requestAnimationFrame(step);

}


if (
  "IntersectionObserver" in window &&
  counters.length
) {

  const counterObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            animateCounter(
              entry.target
            );

            counterObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.7
      }
    );


  counters.forEach(counter => {

    counterObserver.observe(counter);

  });

} else {

  counters.forEach(counter => {

    counter.textContent =
      counter.dataset.target || "0";

  });

}


/* =========================================================
   SERVICE → QUOTE
========================================================= */

document
  .querySelectorAll("[data-service]")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        const service =
          link.dataset.service;

        const select =
          document.getElementById(
            "service"
          );


        if (select && service) {

          select.value = service;

        }

      }
    );

  });


/* =========================================================
   PORTFOLIO FILTER
========================================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );

const portfolioItems =
  document.querySelectorAll(
    ".portfolio-item"
  );

const portfolioEmpty =
  document.getElementById(
    "portfolioEmpty"
  );


filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const filter =
        button.dataset.filter;


      filterButtons.forEach(btn => {

        btn.classList.toggle(
          "active",
          btn === button
        );

      });


      let visible = 0;


      portfolioItems.forEach(item => {

        const show =
          filter === "all" ||
          item.dataset.category === filter;


        item.classList.toggle(
          "is-hidden",
          !show
        );


        if (show) {

          visible++;

        }

      });


      if (portfolioEmpty) {

        portfolioEmpty.classList.toggle(
          "show",
          visible === 0
        );

      }

    }
  );

});


/* =========================================================
   FILE PICKER
========================================================= */

if (artworkInput) {

  artworkInput.addEventListener("change", () => {

    const file = artworkInput.files?.[0];

    if (!file) {

      if (selectedFile) {
        selectedFile.textContent = "";
      }

      return;
    }


    /* -------------------------------------------------------
       Maximum file size: 5MB
    ------------------------------------------------------- */

    const maxSize = 5 * 1024 * 1024;


    /* -------------------------------------------------------
       Allowed extensions
    ------------------------------------------------------- */

    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "pdf"
    ];


    /* -------------------------------------------------------
       Get extension
    ------------------------------------------------------- */

    const fileName =
      file.name.toLowerCase();

    const extension =
      fileName.split(".").pop();


    /* -------------------------------------------------------
       Validate file type OR extension
    ------------------------------------------------------- */

    const validType =
      [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf"
      ].includes(file.type);


    const validExtension =
      allowedExtensions.includes(extension);


    if (!validType && !validExtension) {

      artworkInput.value = "";

      if (selectedFile) {

        selectedFile.textContent =
          "Please choose a JPG, JPEG, PNG or PDF file.";

      }

      return;
    }


    /* -------------------------------------------------------
       Validate file size
    ------------------------------------------------------- */

    if (file.size > maxSize) {

      artworkInput.value = "";

      if (selectedFile) {

        selectedFile.textContent =
          "File is too large. Maximum size is 5MB.";

      }

      return;
    }


    /* -------------------------------------------------------
       Display selected file
    ------------------------------------------------------- */

    if (selectedFile) {

      selectedFile.textContent =
        `Attached: ${file.name} (${formatBytes(file.size)})`;

    }


    console.log(
      "Artwork selected:",
      file.name,
      file.type,
      formatBytes(file.size)
    );

  });

}


/* =========================================================
   FORMAT FILE SIZE
========================================================= */

function formatBytes(bytes) {

  if (bytes < 1024 * 1024) {

    return `${Math.round(bytes / 1024)} KB`;

  }


  return `${
    (bytes / (1024 * 1024)).toFixed(1)
  } MB`;

}


/* =========================================================
   ARTWORK UPLOAD
========================================================= */

async function uploadArtwork(
  file,
  requestId
) {

  if (
    !supabaseClient ||
    !file ||
    !requestId
  ) {

    return null;

  }


  const safeName =
    file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );


  const path =
    `${requestId}/${Date.now()}-${safeName}`;


  const { error } =
    await supabaseClient.storage
      .from(ARTWORK_BUCKET)
      .upload(
        path,
        file,
        {
          upsert: false,
          contentType: file.type
        }
      );


  if (error) {

    console.warn(
      "Artwork upload skipped:",
      error.message
    );

    return null;

  }


  const { data } =
    supabaseClient.storage
      .from(ARTWORK_BUCKET)
      .getPublicUrl(path);


  return data?.publicUrl || null;

}


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp(message) {

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   QUOTE FORM
   =========================================================
   
   IMPORTANT:
   - Supabase saving is BEST EFFORT.
   - WhatsApp remains the main customer contact.
   - A Supabase error will NOT prevent the customer
     from sending the quote.
========================================================= */

if (quoteForm) {

  quoteForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      /* =====================================================
         GET FORM ELEMENTS
      ===================================================== */

      const nameInput =
        document.getElementById("name");

      const phoneInput =
        document.getElementById("phone");

      const serviceInput =
        document.getElementById("service");

      const detailsInput =
        document.getElementById("details");


      const file =
        artworkInput?.files?.[0] || null;


      const name =
        nameInput?.value.trim() || "";


      const phone =
        phoneInput?.value.trim() || "";


      const service =
        serviceInput?.value.trim() || "";


      const details =
        detailsInput?.value.trim() || "";


      /* =====================================================
         VALIDATION
      ===================================================== */

      if (!name) {

        return showFormMessage(
          "Please enter your name.",
          true,
          nameInput
        );

      }


      if (!phone) {

        return showFormMessage(
          "Please enter your phone number.",
          true,
          phoneInput
        );

      }


      if (!service) {

        return showFormMessage(
          "Please select a service.",
          true,
          serviceInput
        );

      }


      /* =====================================================
         DISABLE SUBMIT BUTTON
      ===================================================== */

      if (quoteSubmit) {

        quoteSubmit.disabled = true;

        quoteSubmit.innerHTML =
          "Preparing request…";

      }


      showFormMessage(
        "Preparing your quote request…",
        false
      );


      /* =====================================================
         VARIABLES
      ===================================================== */

      let dbSaved = false;

      let artworkUrl = null;


      /*
         Generate a temporary ID for artwork storage.

         This does NOT depend on the quote_requests
         database ID.
      */

      const artworkRequestId =
        (
          window.crypto &&
          crypto.randomUUID
        )
          ? crypto.randomUUID()
          : `quote-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2)}`;


      try {


        /* ===================================================
           1. UPLOAD ARTWORK
           ===================================================
           
           Artwork upload is optional.

           If it fails, the quote continues.
        =================================================== */

        if (
          file &&
          supabaseClient
        ) {

          try {

            artworkUrl =
              await uploadArtwork(
                file,
                artworkRequestId
              );


            if (artworkUrl) {

              console.log(
                "Artwork uploaded successfully:",
                artworkUrl
              );

            }

          } catch (uploadError) {

            console.warn(
              "Artwork upload failed:",
              uploadError
            );

            artworkUrl = null;

          }

        }


        /* ===================================================
           2. SAVE QUOTE TO SUPABASE
           ===================================================
           
           This is BEST EFFORT.

           If Supabase returns PGRST205,
           RLS error, network error, etc.,
           WhatsApp will still open.
        =================================================== */

        if (supabaseClient) {

          try {

            const { error } =
              await supabaseClient
                .from("quote_requests")
                .insert([
                  {
                    name: name,
                    phone: phone,
                    service: service,
                    details: details,
                    status: "pending"
                  }
                ]);


            if (error) {

              console.warn(
                "Quote could not be saved to Supabase:",
                error
              );

              dbSaved = false;

            } else {

              dbSaved = true;

              console.log(
                "Quote request saved successfully."
              );

            }

          } catch (databaseError) {

            console.warn(
              "Supabase quote save failed:",
              databaseError
            );

            dbSaved = false;

          }

        } else {

          console.warn(
            "Supabase is unavailable. Continuing with WhatsApp."
          );

        }


        /* ===================================================
           3. BUILD WHATSAPP MESSAGE
        =================================================== */

        let message =
`Hello Nabeng Print Media,

I would like to request a quote.

Name: ${name}
Phone: ${phone}
Service: ${service}
Project details: ${details || "Not provided"}`;


        /* ===================================================
           ARTWORK INFORMATION
        =================================================== */

        if (artworkUrl) {

          message +=
`

Artwork/reference:
${artworkUrl}`;

        } else if (file) {

          message +=
`

Artwork/reference:
I have attached artwork/reference through the website, but the upload link was not available.`;

        }


        /* ===================================================
           MESSAGE FOOTER
        =================================================== */

        message +=
`

I have also submitted this request through your website.

Works Beyond Quality.`;


        /* ===================================================
           4. SUCCESS MESSAGE
        =================================================== */

        if (dbSaved) {

          if (artworkUrl) {

            showFormMessage(
              "Quote received successfully. Opening WhatsApp…",
              false
            );

          } else {

            showFormMessage(
              "Quote received. Opening WhatsApp…",
              false
            );

          }

        } else {

          showFormMessage(
            "Opening WhatsApp to complete your quote request…",
            false
          );

        }


        /* ===================================================
           5. RESET FORM
        =================================================== */

        quoteForm.reset();


        if (selectedFile) {

          selectedFile.textContent = "";

        }


        /* ===================================================
           6. OPEN WHATSAPP
        =================================================== */

        openWhatsApp(message);


      } catch (error) {

        /* ===================================================
           FINAL FALLBACK
           =================================================== */

        console.error(
          "Unexpected quote request error:",
          error
        );


        /*
           Even if something unexpected happens,
           try to send the customer's request directly
           through WhatsApp.
        */

        try {

          const fallbackMessage =
`Hello Nabeng Print Media,

I would like to request a quote.

Name: ${name}
Phone: ${phone}
Service: ${service}
Project details: ${details || "Not provided"}

I have submitted this request through the website.

Works Beyond Quality.`;


          openWhatsApp(
            fallbackMessage
          );


          showFormMessage(
            "Opening WhatsApp to complete your quote request…",
            false
          );


          quoteForm.reset();


          if (selectedFile) {

            selectedFile.textContent = "";

          }

        } catch (whatsappError) {

          console.error(
            "WhatsApp fallback failed:",
            whatsappError
          );


          showFormMessage(
            "Something went wrong. Please contact us directly on WhatsApp.",
            true
          );

        }

      } finally {

        /* ===================================================
           RE-ENABLE BUTTON
        =================================================== */

        if (quoteSubmit) {

          quoteSubmit.disabled = false;

          quoteSubmit.innerHTML =
            'Request a Quote <span>↗</span>';

        }

      }

    }
  );

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
  message,
  isError = false,
  focusElement = null
) {

  if (formMessage) {

    formMessage.textContent =
      message;


    formMessage.style.color =
      isError
        ? "#d92d20"
        : "#667085";

  }


  if (focusElement) {

    focusElement.focus();

  }

}


/* =========================================================
   PUBLIC CONTACT SHORTCUTS
========================================================= */

window.NabengPrintMedia = {

  openWhatsApp,

  uploadArtwork

};


/* =========================================================
   INITIALIZATION MESSAGE
========================================================= */

console.log(
  "Nabeng Print Media premium site loaded."
);