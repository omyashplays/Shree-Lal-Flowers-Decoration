/* ============================================
   Shree Lal Flowers & Decoration
   script.js — Site interactivity & configuration
   ============================================ */

// ============================================
// CONFIGURATION
// All contact details in ONE place for easy editing:
// ============================================
const CONFIG = {
  businessName: "Shree Lal Flowers & Decoration",
  phone: "+918084545751",               // <-- Shop phone number
  whatsapp: "+918084545751",            // <-- Shop WhatsApp number
  address: "Piska Nagari, Ranchi, Jharkhand, 835303",
  instagram: "https://www.instagram.com/shri_lal_flower_and_events?utm_source=qr&exln=Y2pkejE2NzMzNzJj",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.829!2d85.2003891!3d23.333264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4df5c6772c095%3A0xb996eedc676a176c!2sShree%20Lal%20Flowers%20And%20Dacoration!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  mapDirectUrl: "https://www.google.com/maps/place/Shree+Lal+Flowers+And+Dacoration/@23.3332591,85.202964,17z/data=!4m6!3m5!1s0x39f4df5c6772c095:0xb996eedc676a176c!8m2!3d23.3332591!4d85.202964!16s%2Fg%2F11xfhys09z",
  defaultWhatsAppMessage:
    "Hello Shree Lal Flowers, I want to ask about flower decoration services in Ranchi. / नमस्ते, मुझे फूल सजावट के बारे में जानकारी चाहिए।",
};

/* ============================================
   1. Mobile Navigation Toggle
   ============================================ */
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav, #nav, #nav-menu");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("no-scroll", isOpen);
  });

  // Close when any nav link is clicked
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => closeNav(hamburger, nav));
  });

  // Close when clicking outside on the backdrop
  nav.addEventListener("click", (e) => {
    if (e.target === nav) closeNav(hamburger, nav);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav(hamburger, nav);
    }
  });
}

function closeNav(hamburger, nav) {
  nav.classList.remove("is-open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

/* ============================================
   2. Header Scroll Effect
   ============================================ */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle("header--scrolled", window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  header.classList.toggle("header--scrolled", window.scrollY > 40);
}

/* ============================================
   3. Gallery Filter
   ============================================ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn, .filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter || "all";

      // Update active states (support both BEM and standard classes)
      filterBtns.forEach((b) => {
        b.classList.remove("active", "filter-btn--active");
      });
      btn.classList.add("active", "filter-btn--active");

      galleryItems.forEach((item) => {
        const itemCat = item.dataset.category;
        const matches = category === "all" || itemCat === category;

        if (matches) {
          item.classList.remove("fade-out", "hidden");
          item.classList.add("fade-in");
        } else {
          item.classList.add("fade-out");
          item.classList.remove("fade-in");
          item.classList.add("hidden");
        }
      });
    });
  });
}

/* ============================================
   4. Lightbox with Touch & Keyboard Support
   ============================================ */
function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox__img, #lightbox-img");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  const prevBtn = lightbox.querySelector(".lightbox__arrow--prev, .lightbox__prev");
  const nextBtn = lightbox.querySelector(".lightbox__arrow--next, .lightbox__next");

  let currentIndex = 0;
  let images = [];
  let touchStartX = 0;
  let touchEndX = 0;

  function collectImages() {
    images = [];
    document.querySelectorAll(".gallery-item:not(.hidden)").forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        images.push({
          src: img.dataset.full || img.src,
          alt: img.alt || "Flower decoration photo by Shree Lal Flowers",
        });
      }
    });
  }

  function openLightbox(index) {
    collectImages();
    if (!images.length || index < 0 || index >= images.length) return;

    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    preloadAdjacent();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function showImage(index) {
    if (!images[index] || !lightboxImg) return;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
  }

  function showPrev() {
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    preloadAdjacent();
  }

  function showNext() {
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    preloadAdjacent();
  }

  function preloadAdjacent() {
    if (images.length < 2) return;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    const nextIdx = (currentIndex + 1) % images.length;
    [prevIdx, nextIdx].forEach((idx) => {
      if (images[idx]) {
        const pre = new Image();
        pre.src = images[idx].src;
      }
    });
  }

  // Open on clicking any gallery item
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item && !item.classList.contains("hidden")) {
      e.preventDefault();
      const visible = Array.from(document.querySelectorAll(".gallery-item:not(.hidden)"));
      const idx = visible.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (nextBtn) nextBtn.addEventListener("click", showNext);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox__content")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) showNext();
      else showPrev();
    }
  }, { passive: true });
}

/* ============================================
   5. WhatsApp & Call Link Generator
   ============================================ */
function getWhatsAppLink(service) {
  const rawPhone = CONFIG.whatsapp.replace(/\D/g, "");
  let message = CONFIG.defaultWhatsAppMessage;

  if (service && service !== "general") {
    message = `Hello Shree Lal Flowers, I want to ask about ${service} decoration in Ranchi. / नमस्ते, मुझे ${service} सजावट के बारे में पूछना है।`;
  }

  return `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
}

function initWhatsAppAndCallLinks() {
  const cleanPhone = CONFIG.phone.replace(/[^\d+]/g, "");

  // Update all elements intended for WhatsApp
  const whatsappElements = document.querySelectorAll(
    "[data-whatsapp-service], [data-whatsapp], .whatsapp-link, .floating-btn--whatsapp, a[href*='wa.me']"
  );

  whatsappElements.forEach((el) => {
    const service = el.dataset.whatsappService || el.dataset.service || "";
    const targetUrl = getWhatsAppLink(service);

    el.setAttribute("href", targetUrl);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");

    el.addEventListener("click", (e) => {
      // Refresh URL right when clicked
      el.setAttribute("href", getWhatsAppLink(service));
    });
  });

  // Update all phone call elements
  const callElements = document.querySelectorAll(
    "[data-call], a[href^='tel:'], .btn--call, .btn-call, .floating-btn--call"
  );

  callElements.forEach((el) => {
    el.setAttribute("href", `tel:${cleanPhone}`);
  });

  // Update all Instagram links
  const instagramElements = document.querySelectorAll(
    "[data-instagram], a[aria-label*='Instagram'], .social-link, .contact-card__instagram"
  );

  instagramElements.forEach((el) => {
    el.setAttribute("href", CONFIG.instagram);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

/* ============================================
   6. Scroll Animations (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll(".animate-on-scroll");
  if (!animatedEls.length) return;

  if (!("IntersectionObserver" in window)) {
    animatedEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedEls.forEach((el) => observer.observe(el));
}

/* ============================================
   7. Active Nav Link
   ============================================ */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav__link").forEach((link) => {
    const linkHref = link.getAttribute("href")?.split("/").pop() || "";
    if (linkHref === currentPath || (currentPath === "" && linkHref === "index.html")) {
      link.classList.add("active", "nav__link--active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ============================================
   8. Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#" || targetId === "#!") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header")?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

/* ============================================
   9. Lazy Loading Fallback
   ============================================ */
function initLazyLoading() {
  document.querySelectorAll("img:not([loading])").forEach((img) => {
    if (img.closest(".hero") || img.closest(".header")) return;
    img.setAttribute("loading", "lazy");
  });
}

/* ============================================
   Initialize everything when DOM is ready
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initHeaderScroll();
  initGalleryFilter();
  initLightbox();
  initWhatsAppAndCallLinks();
  initScrollAnimations();
  initActiveNavLink();
  initSmoothScroll();
  initLazyLoading();
});
