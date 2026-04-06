// ===== SCROLL TO TOP ON LOAD =====
window.scrollTo(0, 0);

// ===== BOOKING PRE-MODAL =====
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;
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

// Intercept all Jane App booking links site-wide
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.href && link.href.includes('wrightchiropractic.janeapp.com')) {
    // Don't intercept the Continue button inside the booking modal itself
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

// ===== UNDER CONSTRUCTION MODAL =====
function closeConstructionModal(event) {
  const modal = document.getElementById('constructionModal');
  if (!modal) return;
  if (event && event.target !== modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  sessionStorage.setItem('constructionSeen', '1');
}

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('constructionModal');
  if (modal && !sessionStorage.getItem('constructionSeen')) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
});

// ===== STICKY HEADER SCROLL =====
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== DROPDOWN MENU =====
  const menuBtn = document.getElementById('menuBtn');
  const dropdownPanel = document.getElementById('dropdownPanel');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    dropdownPanel.classList.toggle('open');
  });

  // Close dropdown on link click
  dropdownPanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      dropdownPanel.classList.remove('open');
    });
  });

  // MOBILE MENU (uses same dropdown)
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    dropdownPanel.classList.toggle('open');
  });

  // ===== CAROUSEL =====
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && dotsContainer) {
    let currentSlide = 0;
    const slides = track.children;
    const totalSlides = slides.length;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      document.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }

    function moveCarousel(dir) {
      let next = currentSlide + dir;
      if (next < 0) next = totalSlides - 1;
      if (next >= totalSlides) next = 0;
      goToSlide(next);
    }

    setInterval(() => moveCarousel(1), 5000);

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) moveCarousel(diff > 0 ? 1 : -1);
    }, { passive: true });
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