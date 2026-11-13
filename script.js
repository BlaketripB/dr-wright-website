// ===== SCROLL TO TOP ON LOAD =====
window.scrollTo(0, 0);

// ===== BOOKING PRE-MODAL =====
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;
  showBookingChoices();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal(event) {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;
  if (event && event.target !== modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function dismissBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function showAutoAccidentMessage() {
  const choices = document.getElementById('bookingChoices');
  const msg = document.getElementById('bookingAutoMsg');
  if (choices) choices.style.display = 'none';
  if (msg) msg.classList.add('visible');
}

function showBookingChoices() {
  const choices = document.getElementById('bookingChoices');
  const msg = document.getElementById('bookingAutoMsg');
  if (choices) choices.style.display = 'flex';
  if (msg) msg.classList.remove('visible');
}

// Intercept all Jane App booking links site-wide
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.href && link.href.includes('wrightchiropractic.janeapp.com')) {
    // Don't intercept links inside the booking modal itself
    if (link.closest('#bookingModal')) return;
    e.preventDefault();
    openBookingModal();
  }
});

// ===== CONTACT MODAL =====
function openContactModal(type) {
  document.getElementById('contactModalTitle').textContent =
    type === 'New Patient' ? 'Book as a New Patient' : 'Welcome Back!';
  document.getElementById('contactModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeContactModal(event) {
  if (event && event.target !== document.getElementById('contactModal')) return;
  document.getElementById('contactModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== STICKY HEADER SCROLL =====
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== DROPDOWN MENU =====
  const menuBtn = document.getElementById('menuBtn');
  const menuToggle = document.getElementById('menuToggle');
  const dropdownPanel = document.getElementById('dropdownPanel');

  const servicesToggle = dropdownPanel.querySelector('.nav-services-toggle');
  const servicesMenu = dropdownPanel.querySelector('.nav-services-menu');

  function setMenuExpanded(open) {
    menuBtn.classList.toggle('active', open);
    menuToggle.classList.toggle('active', open);
    dropdownPanel.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open) {
      if (servicesMenu) servicesMenu.classList.remove('is-open');
      if (servicesToggle) servicesToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function closeMenu() {
    setMenuExpanded(false);
  }

  menuBtn.addEventListener('click', () => {
    setMenuExpanded(!dropdownPanel.classList.contains('open'));
  });

  if (servicesToggle && servicesMenu) {
    servicesToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = servicesMenu.classList.toggle('is-open');
      servicesToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Close dropdown on link click
  dropdownPanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  menuToggle.addEventListener('click', () => {
    setMenuExpanded(!dropdownPanel.classList.contains('open'));
  });

  // ===== REVIEWS CAROUSEL =====
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const carouselContainer = track ? track.closest('.carousel-container') : null;

  if (track && dotsContainer && carouselContainer) {
    const cards = Array.from(track.children);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentPage = 0;
    let autoTimer = null;
    let paused = false;

    function perPage() {
      if (window.matchMedia('(max-width: 700px)').matches) return 1;
      if (window.matchMedia('(max-width: 1100px)').matches) return 2;
      return 3;
    }

    function pageCount() {
      return Math.max(1, cards.length - perPage() + 1);
    }

    function cardStep() {
      const card = cards[0];
      return card ? card.getBoundingClientRect().width : track.clientWidth;
    }

    function updateDots() {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPage);
      });
    }

    function rebuildDots() {
      const pages = pageCount();
      currentPage = Math.min(currentPage, pages - 1);
      dotsContainer.innerHTML = '';
      cards.forEach((card, i) => {
        card.style.scrollSnapAlign = i < pages ? 'start' : 'none';
      });
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot' + (i === currentPage ? ' active' : '');
        dot.setAttribute('aria-label', `Go to reviews page ${i + 1}`);
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToPage(index) {
      const pages = pageCount();
      currentPage = ((index % pages) + pages) % pages;
      track.scrollTo({
        left: currentPage * cardStep(),
        behavior: motionQuery.matches ? 'auto' : 'smooth'
      });
      updateDots();
    }

    window.moveCarousel = function moveCarousel(dir) {
      goToPage(currentPage + dir);
    };

    function startAuto() {
      clearInterval(autoTimer);
      if (motionQuery.matches || paused || pageCount() < 2) return;
      autoTimer = setInterval(() => goToPage(currentPage + 1), 6000);
    }

    function syncFromScroll() {
      const step = cardStep();
      if (!step) return;
      const page = Math.round(track.scrollLeft / step);
      const next = Math.max(0, Math.min(page, pageCount() - 1));
      if (next !== currentPage) {
        currentPage = next;
        updateDots();
      }
    }

    carouselContainer.addEventListener('mouseenter', () => {
      paused = true;
      clearInterval(autoTimer);
    });
    carouselContainer.addEventListener('mouseleave', () => {
      paused = false;
      startAuto();
    });
    carouselContainer.addEventListener('focusin', () => {
      paused = true;
      clearInterval(autoTimer);
    });
    carouselContainer.addEventListener('focusout', (event) => {
      if (carouselContainer.contains(event.relatedTarget)) return;
      paused = false;
      startAuto();
    });

    let scrollTimer = null;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(syncFromScroll, 80);
    }, { passive: true });

    window.addEventListener('resize', () => {
      rebuildDots();
      goToPage(currentPage);
      startAuto();
    });

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', startAuto);
    }

    rebuildDots();
    startAuto();
  } else {
    window.moveCarousel = function () {};
  }

  // ===== FAQ ACCORDION =====
  window.toggleFaq = function toggleFaq(btn) {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isActive) {
      item.classList.add('active');
      const answer = item.querySelector('.faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

// ===== Welcome Popup =====
(function initWelcomePopup() {
  const overlay = document.getElementById('welcomePopup');
  if (!overlay) return;

  const card = overlay.querySelector('.welcome-card');
  const dismissBtn = overlay.querySelector('.welcome-dismiss');
  const bookBtn = overlay.querySelector('.welcome-book-btn');
  let isOpen = false;
  let previousFocus = null;

  function openWelcomePopup() {
    if (isOpen || sessionStorage.getItem('welcomeShown')) return;

    isOpen = true;
    previousFocus = document.activeElement;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      card.focus();
    });
  }

  function closeWelcomePopup() {
    if (!isOpen) return;

    isOpen = false;
    sessionStorage.setItem('welcomeShown', '1');
    overlay.classList.remove('is-visible');
    overlay.classList.add('is-closing');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(() => {
      overlay.classList.remove('is-closing');
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    }, 350);
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeWelcomePopup();
  });

  dismissBtn.addEventListener('click', closeWelcomePopup);

  bookBtn.addEventListener('click', closeWelcomePopup);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) closeWelcomePopup();
  });

})();