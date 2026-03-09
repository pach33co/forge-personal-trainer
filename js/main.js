// ============================================
//  FORGE — Personal Training
//  main.js
// ============================================

// ── 1. NAVBAR GLASS AO SCROLLAR ──────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ── 2. SCROLL REVEAL ─────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ── 3. CONTADORES ANIMADOS ───────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// ── 4. HIGHLIGHT DO LINK ATIVO NA NAVBAR ─────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));

      const activeLink = document.querySelector(
        `.nav-links a[href="#${entry.target.id}"]`
      );
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));


// ── 5. SMOOTH SCROLL NO BOTÃO DA NAVBAR ──────
document.querySelector('.nav-cta').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({
    behavior: 'smooth'
  });
});


// ── 6. MÁSCARA DE TELEFONE NO FORMULÁRIO ─────
const phoneInput = document.getElementById('whatsapp');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });
}

// ── MENU MOBILE ───────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-links a');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  mobileMenu.style.cssText += '; transform: translateX(0) !important; pointer-events: all !important;';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOpen = false;
  mobileMenu.style.cssText += '; transform: translateX(100%) !important; pointer-events: none !important;';
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  menuOpen ? closeMenu() : openMenu();
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('click', (e) => {
  if (menuOpen && !hamburger.contains(e.target)) closeMenu();
});

window.addEventListener('scroll', () => {
  if (menuOpen) closeMenu();
});



