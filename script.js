document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.innerWidth <= 768;

  // ===== Introduction Section =====
  const introText =
    "Mehndi By Simra is a premier provider of intricate henna designs for weddings, festivals, and special occasions. Known for precision and artistry, the studio specializes in blending traditional patterns with contemporary styles to suit a wide range of cultural and personal preferences. With over ten years of experience, lead artist Simra is recognized for creating bespoke designs that leave a lasting impression.<br><br>Every application is executed with a focus on detail, hygiene, and client comfort. Mehndi By Simra is dedicated to delivering exceptional quality while ensuring an elegant and seamless experience from consultation to final stain.";

  const introTarget = document.getElementById("typed-paragraph");

  if (introTarget) {
    if (isMobile) {
      introTarget.innerHTML = introText;
    } else {
      let index = 0;
      function typeIntro() {
        if (index < introText.length) {
          if (introText.slice(index, index + 4) === "<br>") {
            introTarget.innerHTML += "<br>";
            index += 4;
          } else {
            introTarget.innerHTML += introText.charAt(index);
            index++;
          }
          setTimeout(typeIntro, 15);
        }
      }
      typeIntro();
    }
  }

  // ===== Portfolio Section =====
  const portfolioText =
    "Each design in this portfolio is a testament to the artistry and cultural richness behind mehndi. Curated into bridal, party, and festive categories, the sections below showcase a range of work tailored for every occasion. Selecting a design will open additional photos and videos, offering a closer look at the detail and craftsmanship behind each piece.";

  const portfolioTarget = document.getElementById("typed-portfolio");

  if (portfolioTarget) {
    if (isMobile) {
      portfolioTarget.textContent = portfolioText;
    } else {
      let index = 0;
      function typePortfolio() {
        if (index < portfolioText.length) {
          portfolioTarget.innerHTML += portfolioText.charAt(index);
          index++;
          setTimeout(typePortfolio, 15);
        }
      }
      typePortfolio();
    }
  }

  // ===== Contact Section =====
  const contactTarget = document.getElementById("typed-contact");
  const beforeLink = "For inquiries or to view additional designs, please visit ";
  const linkText = "@mehndibysimra";
  const afterLink =
    " on Instagram. Direct messages are encouraged for faster communication. Alternatively, the contact form below is available for those without access to Instagram.";
  const fullContactText = beforeLink + linkText + afterLink;

  if (contactTarget) {
    if (isMobile) {
      const link = document.createElement("a");
      link.href = "https://www.instagram.com/mehndibysimra";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = linkText;
      link.className = "no-style-link";

      contactTarget.textContent = beforeLink;
      contactTarget.appendChild(link);
      contactTarget.appendChild(document.createTextNode(afterLink));
    } else {
      let index = 0;
      function typeContact() {
        if (index < fullContactText.length) {
          if (index === beforeLink.length) {
            const link = document.createElement("a");
            link.href = "https://www.instagram.com/mehndibysimra";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = linkText;
            link.className = "no-style-link";
            link.addEventListener("mouseenter", () => {
              link.style.fontWeight = "600";
            });
            link.addEventListener("mouseleave", () => {
              link.style.fontWeight = "normal";
            });

            contactTarget.appendChild(link);
            index += linkText.length;
          } else {
            contactTarget.appendChild(document.createTextNode(fullContactText.charAt(index)));
            index++;
          }
          setTimeout(typeContact, 15);
        }
      }
      typeContact();
    }
  }

  // ===== Contact Form Submission =====
  const form = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  function typeSuccessMessage(message, element) {
    element.textContent = "";
    let i = 0;
    function type() {
      if (i < message.length) {
        element.textContent += message.charAt(i);
        i++;
        setTimeout(type, 20);
      }
    }
    type();
  }

  if (form && formSuccess) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            formSuccess.style.display = "block";
            typeSuccessMessage(
              "Thank you for your inquiry. A response will be provided within 2–3 business days.",
              formSuccess
            );
            const inputs = form.querySelectorAll(
              "input, textarea, select, button"
            );
            inputs.forEach((input) => (input.disabled = true));
          } else {
            alert("There was an issue submitting the form. Please try again later.");
          }
        })
        .catch(() => {
          alert("There was a connection issue. Please try again later.");
        });
    });
  }
});

// Logo glow on click (only desktop)
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".glow-logo");

  if (logo) {
    logo.addEventListener("click", () => {
      if (window.innerWidth > 768) {
        logo.classList.remove("logo-glow"); // reset if already added
        void logo.offsetWidth; // force reflow
        logo.classList.add("logo-glow");
      }
    });
  }
  
});

