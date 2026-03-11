// ===== SCROLL TO TOP ON LOAD =====
window.scrollTo(0, 0);

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
  if (event && event.target !== document.getElementById('constructionModal')) return;
  document.getElementById('constructionModal').classList.remove('active');
  document.body.style.overflow = '';
  sessionStorage.setItem('constructionSeen', '1');
}

window.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('constructionSeen')) {
    document.getElementById('constructionModal').classList.add('active');
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
  let currentSlide = 0;
  const track = document.getElementById('carouselTrack');
  const slides = track.children;
  const totalSlides = slides.length;
  const dotsContainer = document.getElementById('carouselDots');

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

  // ===== FAQ ACCORDION =====
  function toggleFaq(btn) {
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