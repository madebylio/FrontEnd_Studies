const heroCard = document.querySelector(".hero-card");
const secretBtn = document.querySelector(".secret-btn");
const subtitle = document.querySelector(".subtitle");
const paperNote = document.querySelector(".paper-note");
const topMenu = document.querySelector(".top-menu");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".menu-links a");

if (topMenu && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topMenu.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      topMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

if (heroCard && secretBtn && subtitle) {
  const defaultSubtitle = subtitle.dataset.defaultText || subtitle.textContent;
  let creativeTimer;

  secretBtn.addEventListener("click", () => {
    clearTimeout(creativeTimer);

    heroCard.classList.remove("creative-mode");
    paperNote?.classList.remove("creative-mode");
    void heroCard.offsetWidth;

    heroCard.classList.add("creative-mode");
    paperNote?.classList.add("creative-mode");
    subtitle.textContent = "Creative mode unlocked.";

    creativeTimer = setTimeout(() => {
      heroCard.classList.remove("creative-mode");
      paperNote?.classList.remove("creative-mode");
      subtitle.textContent = defaultSubtitle;
    }, 6200);
  });
}
