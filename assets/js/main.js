/* ==========================================================================
   AETHERIA IPTV PRIME - ULTRA LUXURY APPLICATION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initPageTransitions();
  initAmbientParticleCanvas();
  initCursorGlowFollower();
  initHeroSpotlightSlider();
  initMarqueeShowcase();
  init3DCardsTilt();
  initStatsCounters();
  initFAQAccordion();
  initScrollReveal();
  initTrailerModal();
  initCheckoutModal();
  initContactForm();
  initPricingToggle();
});

/* --- Header Scroll & Navigation --- */
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* --- Mobile Nav Drawer --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const closeBtn = document.querySelector(".mobile-close-btn");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-overlay");
  const menuLinks = document.querySelectorAll(".mobile-menu .nav-link, .mobile-menu .btn");

  if (!toggleBtn || !menu || !overlay) return;

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  overlay.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
    }
  });
}

/* --- Smooth Page Transitions --- */
function initPageTransitions() {
  let curtain = document.querySelector(".page-transition-curtain");
  if (!curtain) {
    curtain = document.createElement("div");
    curtain.className = "page-transition-curtain";
    curtain.innerHTML = '<div class="curtain-loader"></div>';
    document.body.appendChild(curtain);
  }

  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", e => {
      const targetHref = link.getAttribute("href");
      const currentPath = window.location.pathname.split("/").pop() || "index.html";

      if (targetHref && targetHref !== currentPath && !targetHref.startsWith("#")) {
        e.preventDefault();
        curtain.classList.add("active");
        setTimeout(() => {
          window.location.href = targetHref;
        }, 350);
      }
    });
  });
}

/* --- Ambient Particle Canvas --- */
function initAmbientParticleCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: i % 2 === 0 ? "rgba(124, 58, 237, " : "rgba(59, 130, 246, ",
      alpha: Math.random() * 0.5 + 0.15
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color.includes("124") ? "rgba(124, 58, 237, 0.8)" : "rgba(59, 130, 246, 0.8)";
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* --- Cursor Radial Glow --- */
function initCursorGlowFollower() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* --- 3D Cards Perspective Tilt --- */
function init3DCardsTilt() {
  const cards = document.querySelectorAll(".device-card-item, .why-card, .pricing-card, .brand-card, .sports-event-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* --- Hero Spotlight Switcher --- */
function initHeroSpotlightSlider() {
  const slides = document.querySelectorAll(".spotlight-slide");
  if (slides.length === 0) return;

  let currentIndex = 0;
  setInterval(() => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }, 5000);
}

/* --- Animated Statistics Counter Numbers --- */
function initStatsCounters() {
  const statElements = document.querySelectorAll("[data-counter]");
  if (!statElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseFloat(el.getAttribute("data-counter"));
          const prefix = el.getAttribute("data-prefix") || "";
          const suffix = el.getAttribute("data-suffix") || "";

          let count = 0;
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = targetNum / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= targetNum) {
              count = targetNum;
              clearInterval(timer);
            }
            if (targetNum % 1 !== 0) {
              el.textContent = `${prefix}${count.toFixed(2)}${suffix}`;
            } else {
              el.textContent = `${prefix}${Math.floor(count).toLocaleString()}${suffix}`;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  statElements.forEach(el => observer.observe(el));
}

/* --- Render EXACTLY 2 MARQUEE TRACKS --- */
function initMarqueeShowcase() {
  if (typeof ARTWORK_DATASET === "undefined") return;

  const row1 = document.getElementById("marquee-row-1");
  const row2 = document.getElementById("marquee-row-2");

  if (!row1 || !row2) return;

  // Split iconic items into exactly 2 smooth tracks (Line 1: Netflix/HBO Blockbusters, Line 2: Anime & Sports)
  const items1 = ARTWORK_DATASET.slice(0, 15);
  const items2 = ARTWORK_DATASET.slice(15, 30);

  fillTrack(row1, items1);
  fillTrack(row2, items2);
}

function fillTrack(trackElement, items) {
  trackElement.innerHTML = "";
  const duplicatedItems = [...items, ...items];

  const fallbackPosters = [
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
  ];

  duplicatedItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "artwork-card";
    card.setAttribute("data-artwork-id", item.id);

    const fallbackUrl = fallbackPosters[index % fallbackPosters.length];

    card.innerHTML = `
      <div class="artwork-canvas-wrapper" style="background: #121212;">
        <div class="artwork-top-badges">
          <span class="quality-badge">${item.badge}</span>
          <span class="year-tag">${item.year}</span>
        </div>
        <img src="${item.bgPhoto}" alt="${item.title}" class="artwork-img" loading="lazy" referrerpolicy="no-referrer" onError="this.onerror=null; this.src='${fallbackUrl}';">
        <div class="artwork-info-overlay">
          <span class="artwork-genre-badge">${item.genre}</span>
          <h4 class="artwork-card-title">${item.title}</h4>
          <div class="artwork-meta-row">
            <span class="match-score">${item.match} Match</span>
            <span>${item.duration}</span>
          </div>
          <div class="play-btn-circle">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openModalWithArtwork(item);
    });

    trackElement.appendChild(card);
  });
}

/* --- FAQ Accordion --- */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll(".faq-header");
  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
}

/* --- Quick Preview Modal --- */
function initTrailerModal() {
  const modal = document.getElementById("trailer-modal");
  const closeBtn = document.querySelector(".modal-close-btn");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

function openModalWithArtwork(item) {
  const modal = document.getElementById("trailer-modal");
  if (!modal) return;

  const titleEl = document.getElementById("modal-title");
  const genreEl = document.getElementById("modal-genre");
  const matchEl = document.getElementById("modal-match");
  const durationEl = document.getElementById("modal-duration");
  const synopsisEl = document.getElementById("modal-synopsis");
  const castEl = document.getElementById("modal-cast");
  const directorEl = document.getElementById("modal-director");
  const posterEl = document.getElementById("modal-poster");

  if (titleEl) titleEl.textContent = item.title;
  if (genreEl) genreEl.textContent = item.genre;
  if (matchEl) matchEl.textContent = `${item.match} Match`;
  if (durationEl) durationEl.textContent = `${item.year} • ${item.duration}`;
  if (synopsisEl) synopsisEl.textContent = item.synopsis;
  if (castEl) castEl.textContent = `Cast: ${item.cast}`;
  if (directorEl) directorEl.textContent = `Director/Studio: ${item.director}`;
  if (posterEl) {
    posterEl.referrerPolicy = "no-referrer";
    posterEl.src = item.bgPhoto;
    posterEl.onerror = function() {
      this.src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop";
    };
  }

  modal.classList.add("open");
}

function closeModal() {
  const modal = document.getElementById("trailer-modal");
  if (modal) modal.classList.remove("open");
}

/* --- Pricing Billing Toggle --- */
function initPricingToggle() {
  const toggleBtn = document.getElementById("billing-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("change", e => {
    const isAnnual = e.target.checked;
    const priceElems = document.querySelectorAll("[data-monthly-price]");

    priceElems.forEach(el => {
      const monthly = el.getAttribute("data-monthly-price");
      const annual = el.getAttribute("data-annual-price");
      el.textContent = isAnnual ? annual : monthly;
    });
  });
}

/* --- Checkout Modal Engine --- */
function initCheckoutModal() {
  const checkoutModal = document.getElementById("checkout-modal");
  if (!checkoutModal) return;

  const closeBtn = checkoutModal.querySelector(".modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      checkoutModal.classList.remove("open");
    });
  }

  checkoutModal.addEventListener("click", e => {
    if (e.target === checkoutModal) checkoutModal.classList.remove("open");
  });
}

/* --- Contact Form Handler & Plan Pre-Fill --- */
function initContactForm() {
  const form = document.getElementById("contact-form");

  const urlParams = new URLSearchParams(window.location.search);
  const selectedPlan = urlParams.get("plan");
  const messageInput = document.getElementById("contact-message");

  if (selectedPlan && messageInput) {
    const formattedPlan = selectedPlan.replace("-", " ");
    messageInput.value = `Hello! I would like to subscribe to the ${formattedPlan} IPTV Plan. Please send setup instructions.`;
  }

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");

    if (!nameInput || !emailInput || !nameInput.value.trim() || !emailInput.value.trim()) {
      showToast("Please fill out all required fields.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending VIP Ticket...";
    }

    setTimeout(() => {
      showToast(`Thank you ${nameInput.value.trim()}! Our VIP desk has received your ticket and emailed setup instructions.`);
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send VIP Request";
      }
    }, 1200);
  });
}

/* --- Custom Toast Notification --- */
function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#7C3AED"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
