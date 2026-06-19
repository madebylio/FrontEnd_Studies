const heroCard = document.querySelector(".hero-card");
const secretBtn = document.querySelector(".secret-btn");
const subtitle = document.querySelector(".subtitle");
const paperNote = document.querySelector(".paper-note");
const topMenu = document.querySelector(".top-menu");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".menu-links a");
const copyEmailButtons = document.querySelectorAll("[data-copy-email]");

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

if (copyEmailButtons.length) {
  const toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);

  let toastTimer;

  const showToast = (message, anchor) => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.remove("is-visible");

    const anchorRect = anchor.getBoundingClientRect();
    const toastRect = toast.getBoundingClientRect();
    const gap = 12;
    const viewportGap = 12;
    const left = Math.min(
      Math.max(anchorRect.left + anchorRect.width / 2, toastRect.width / 2 + viewportGap),
      window.innerWidth - toastRect.width / 2 - viewportGap
    );
    let top = anchorRect.top - toastRect.height - gap;

    if (top < viewportGap) {
      top = anchorRect.bottom + gap;
      toast.classList.add("is-below");
    } else {
      toast.classList.remove("is-below");
    }

    toast.style.left = left + "px";
    toast.style.top = top + "px";

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2200);
  };

  const copyWithFallback = (email) => {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand("copy");
    textarea.remove();

    return copied;
  };

  const copyEmail = async (email, anchor) => {
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copiado: " + email, anchor);
    } catch {
      const copied = copyWithFallback(email);
      showToast(copied ? "Email copiado: " + email : email, anchor);
    }
  };

  copyEmailButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      copyEmail(button.dataset.copyEmail, button);
    });
  });
}
