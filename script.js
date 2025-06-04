document.addEventListener("DOMContentLoaded", function () {
  // Check which page we're on by looking for specific elements
  const onIndex = document.getElementById("intro") !== null;
  const onAbout = document.getElementById("designs") !== null;
  const onFAQ = document.getElementById("faqAccordion") !== null;
  const onContact = document.getElementById("contactForm") !== null;

  // =============================
  // 1) About / Portfolio page logic
  // =============================
  if (onAbout) {
    // Reviews data
    const reviews = [
      {
        name: "Zara Malik",
        text: "Simra was amazing! She made me feel so comfortable and her designs were incredibly detailed. Everyone at the event complimented my mehndi. Highly recommend her services!"
      },
      {
        name: "Hina Siddiqui",
        text: "Absolutely loved the work! 💕 The stain lasted for so long and the design was exactly how I wanted it. Simra is professional and so talented."
      },
      {
        name: "Anum Farooq",
        text: "Such an elegant experience! From consultation to application, it was seamless. The mehndi turned out beautiful and dark."
      },
      {
        name: "Rabia Khan",
        text: "Simra's mehndi added a magical touch to my sister’s wedding. The design was so neat and symmetrical. Thank you for the lovely work!"
      },
      {
        name: "Fariha Iqbal",
        text: "I was so impressed with the creativity and patience. Simra really took her time and the final result was breathtaking!"
      },
      {
        name: "Sana Javed",
        text: "Booked for Eid and everyone in the family loved the designs! 🌙 The stain developed beautifully too. Definitely booking again."
      },
      {
        name: "Mehwish Chaudhry",
        text: "My go-to for all events now. The professionalism, hygiene, and skill are unmatched. Couldn’t be happier with the results."
      },
      {
        name: "Amna Sheikh",
        text: "Loved every part of the experience 💫 From start to finish, Simra was kind and professional. My design was a hit at the party!"
      },
      {
        name: "Nida Tariq",
        text: "Simra is truly an artist. Her attention to detail and ability to customize exactly what I wanted made all the difference!"
      }
    ];

    const reviewContainer = document.getElementById("client-photos");
    reviews.forEach((review) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";
      col.innerHTML = `
        <div class="card text-light p-3 h-100" style="background-color: rgba(0, 0, 0, 0.3);">
          <p class="card-text">${review.text}</p>
          <p class="text-light font-weight-bold mb-0">– ${review.name}</p>
        </div>
      `;
      reviewContainer.appendChild(col);
    });

    // Albums for lightbox
    const albums = {
      bridal: [
        "images/bridal1.jpeg",
        "images/bridal2.jpeg",
        "images/bridal3.jpeg",
        { type: "video", src: "images/bridal6.mp4" },
        "images/bridal4.jpeg",
        { type: "video", src: "images/bridal8.mp4" },
        "images/bridal5.jpeg",
        { type: "video", src: "images/bridal9.mp4" },
        { type: "video", src: "images/bridal10.mp4" }
      ],
      party: [
        "images/party1.jpeg",
        "images/party2.jpeg",
        { type: "video", src: "images/party7.mp4" },
        "images/party3.jpeg",
        "images/party4.jpeg",
        { type: "video", src: "images/party8.mp4" },
        "images/party5.jpeg",
        "images/party6.jpeg"
      ],
      festive: [
        "images/festive1.jpeg",
        "images/festive2.jpeg",
        { type: "video", src: "images/festive8.mp4" },
        "images/festive3.jpeg",
        { type: "video", src: "images/festive10.mp4" },
        "images/festive4.jpeg",
        "images/festive5.jpeg",
        "images/festive6.jpeg",
        "images/festive7.jpeg",
        "images/festive9.jpeg"
      ]
    };

    const titles = {
      bridal: "Bridal Mehndi Designs",
      party: "Party Mehndi Designs",
      festive: "Festive Mehndi Designs"
    };

    let currentAlbum = [],
      currentIndex = 0;

    function updateModalContent() {
      const item = currentAlbum[currentIndex];
      const content =
        typeof item === "string"
          ? `<img src="${item}" class="img-fluid" alt="Mehndi Design">`
          : `<video controls autoplay muted playsinline preload="auto" class="img-fluid"><source src="${item.src}" type="video/mp4"></video>`;

      document.getElementById("lightboxContent").innerHTML = content;
    }

    document.querySelectorAll("[data-toggle='modal']").forEach((el) => {
      el.addEventListener("click", function () {
        const section = this.getAttribute("data-section");
        currentAlbum = albums[section];
        currentIndex = 0;
        document.getElementById("lightboxModalLabel").innerText = titles[section];
        updateModalContent();
      });
    });

    // Keyboard navigation inside modal
    document.addEventListener("keydown", function (e) {
      if (document.getElementById("lightboxModal").classList.contains("show")) {
        if (e.key === "ArrowRight") {
          currentIndex = (currentIndex + 1) % currentAlbum.length;
          updateModalContent();
        } else if (e.key === "ArrowLeft") {
          currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
          updateModalContent();
        }
      }
    });

    // Swipe support for mobile inside modal
    let touchStartX = null,
      touchEndX = null;
    const modalEl = document.getElementById("lightboxModal");
    modalEl.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });
    modalEl.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX && touchEndX) {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          currentIndex =
            diff > 0
              ? (currentIndex + 1) % currentAlbum.length
              : (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
          updateModalContent();
        }
      }
      touchStartX = null;
      touchEndX = null;
    });
  }

  // =============================
  // 2) FAQ page logic
  // =============================
  if (onFAQ) {
    // Already handled inline in faq.html
  }

  // =============================
  // 3) Contact page logic
  // =============================
  if (onContact) {
    const form = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then((response) => {
          if (response.ok) {
            formSuccess.style.display = "block";
            formSuccess.textContent =
              "Thank you for your submission. You will be contacted within 2–3 business days.";
            form.querySelectorAll("input, textarea, select, button").forEach((input) => {
              input.disabled = true;
            });
          } else {
            alert("There was an issue submitting the form. Please try again later.");
          }
        })
        .catch(() => {
          alert("There was a connection issue. Please try again later.");
        });
    });
  }

  // =============================
  // 4) Common logo glow reset on click (desktop only)
  // =============================
  const logo = document.querySelector(".glow-logo");
  if (logo && window.innerWidth > 768) {
    logo.addEventListener("click", () => {
      logo.classList.remove("logo-glow");
      void logo.offsetWidth;
      logo.classList.add("logo-glow");
    });
  }
});
