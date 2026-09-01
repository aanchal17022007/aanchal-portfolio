const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

const glow = document.querySelector(".cursor-glow");

if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

const revealTargets = document.querySelectorAll(
  ".skill-card, .experience-card, .project, .training-item, .cert-card, .timeline-item, .stat, .contact-item"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => {
  el.classList.add("reveal-ready");
  observer.observe(el);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = `
  .reveal-ready {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .reveal-ready.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.opacity = link.getAttribute("href") === `#${entry.target.id}` ? "1" : ".55";
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


// Certificate viewer
const certificateModal = document.getElementById("certificateModal");
const certificateImage = document.getElementById("certificateImage");
const certificatePdf = document.getElementById("certificatePdf");
const certificateClose = document.querySelector(".modal-close");

document.querySelectorAll(".certificate-open").forEach(card => {
  card.addEventListener("click", () => {
    const file = card.dataset.certificate;
    const type = card.dataset.type;

    certificateImage.classList.remove("active");
    certificatePdf.classList.remove("active");

    if (type === "pdf") {
      certificatePdf.src = file;
      certificatePdf.classList.add("active");
    } else {
      certificateImage.src = file;
      certificateImage.classList.add("active");
    }

    certificateModal.classList.add("open");
    certificateModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeCertificate() {
  certificateModal.classList.remove("open");
  certificateModal.setAttribute("aria-hidden", "true");
  certificateImage.src = "";
  certificatePdf.src = "";
  document.body.classList.remove("modal-open");
}

certificateClose?.addEventListener("click", closeCertificate);

certificateModal?.addEventListener("click", event => {
  if (event.target === certificateModal) closeCertificate();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && certificateModal?.classList.contains("open")) {
    closeCertificate();
  }
});
