document.addEventListener("DOMContentLoaded", function () {
  // HERO text
  const text =
    "Mehndi By Simra is a premier provider of intricate henna designs for weddings, festivals, and special occasions. Known for precision and artistry, the studio specializes in blending traditional patterns with contemporary styles to suit a wide range of cultural and personal preferences. With over ten years of experience, lead artist Simra is recognized for creating bespoke designs that leave a lasting impression.<br><br>Every application is executed with a focus on detail, hygiene, and client comfort. Mehndi By Simra is dedicated to delivering exceptional quality while ensuring an elegant and seamless experience from consultation to final stain.";

  const heroTarget = document.getElementById("typed-paragraph");
  let heroIndex = 0;

  function typeHeroText() {
    if (heroIndex < text.length) {
      if (text.slice(heroIndex, heroIndex + 4) === "<br>") {
        heroTarget.innerHTML += "<br>";
        heroIndex += 4;
      } else {
        heroTarget.innerHTML += text.charAt(heroIndex);
        heroIndex++;
      }
      setTimeout(typeHeroText, 15);
    }
  }
  if (heroTarget) typeHeroText();

  // Portfolio text
  const portfolioText =
    "Each design in this portfolio is a testament to the artistry and cultural richness behind mehndi. Curated into bridal, party, and festive categories, the sections below showcase a range of work tailored for every occasion. Selecting a design will open additional photos and videos, offering a closer look at the detail and craftsmanship behind each piece.";

  const portfolioTarget = document.getElementById("typed-portfolio");
  let portfolioIndex = 0;

  function typePortfolioText() {
    if (!portfolioTarget) return;
    if (portfolioIndex < portfolioText.length) {
      portfolioTarget.innerHTML += portfolioText.charAt(portfolioIndex);
      portfolioIndex++;
      setTimeout(typePortfolioText, 15);
    }
  }
  if (portfolioTarget) typePortfolioText();

  // Contact text with Instagram link
  const contactTarget = document.getElementById("typed-contact");
  const beforeLink =
    "For inquiries or to view additional designs, please visit ";
  const linkText = "@mehndibysimra";
  const afterLink =
    " on Instagram. Direct messages are encouraged for faster communication. Alternatively, the contact form below is available for those without access to Instagram.";
  const fullText = beforeLink + linkText + afterLink;

  let contactIndex = 0;

  function typeContactText() {
    if (!contactTarget) return;

    if (contactIndex < fullText.length) {
      if (contactIndex === beforeLink.length) {
        const link = document.createElement("a");
        link.href = "https://www.instagram.com/mehndibysimra";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = linkText;
        link.style.textDecoration = "none";
        link.style.color = "inherit";
        link.style.transition = "all 0.2s ease";

        // Hover effect
        link.addEventListener("mouseenter", function () {
          this.style.fontWeight = "600";
        });
        link.addEventListener("mouseleave", function () {
          this.style.fontWeight = "normal";
        });

        contactTarget.appendChild(link);
        contactIndex += linkText.length;
      } else {
        const char = fullText.charAt(contactIndex);
        contactTarget.appendChild(document.createTextNode(char));
        contactIndex++;
      }
      setTimeout(typeContactText, 15);
    }
  }
  if (contactTarget) typeContactText();

  // Contact Form Submission
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
            alert(
              "There was an issue submitting the form. Please try again later."
            );
          }
        })
        .catch(() => {
          alert("There was a connection issue. Please try again later.");
        });
    });
  }
});
