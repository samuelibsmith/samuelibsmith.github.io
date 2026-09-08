/* ========================================================================== 
   MECHANICAL ENGINEERING PORTFOLIO — interaction layer
   ========================================================================== */

const TYPEWRITER_PHRASES = [
  'Mechanical Engineer',
  'CAD + Product Design',
  'Mechanical Engineering Student',
  'CAD + Product Design',
  'Engineering Analysis',
  'Prototype Development'
];

const TYPEWRITER_SPEED = { typing: 65, deleting: 35, holdFull: 1500, holdEmpty: 450 };


function initThemeControl() {
  const switcher = document.getElementById('themeSwitch');
  const buttons = document.querySelectorAll('[data-theme-choice]');
  if (!switcher || buttons.length !== 2) return;

  // This key is intentionally shared by every page in the portfolio.
  const STORAGE_KEY = 'portfolio-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const getSystemTheme = () => (media.matches ? 'dark' : 'light');

  const getSavedTheme = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch (e) {
      return null;
    }
  };

  const applyTheme = (theme, persist = false) => {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = normalized;
    switcher.dataset.themeState = normalized;

    buttons.forEach((button) => {
      const active = button.dataset.themeChoice === normalized;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, normalized);
      } catch (e) {}
    }
  };

  // The inline script in <head> already paints the correct theme. Re-sync
  // here and update the control state once the DOM is ready.
  applyTheme(getSavedTheme() || getSystemTheme(), false);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(button.dataset.themeChoice, true);
    });
  });

  // With no manual choice, continue following OS/browser changes.
  const handleSystemChange = () => {
    if (!getSavedTheme()) applyTheme(getSystemTheme(), false);
  };

  if (media.addEventListener) {
    media.addEventListener('change', handleSystemChange);
  } else {
    media.addListener(handleSystemChange);
  }

  // Keep the UI synchronized if another portfolio page changes the saved
  // preference while this page remains open in another tab.
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      applyTheme(event.newValue === 'dark' ? 'dark' : event.newValue === 'light' ? 'light' : getSystemTheme(), false);
    }
  });
}

function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el || TYPEWRITER_PHRASES.length === 0) return;
  let phraseIndex = 0, charIndex = 0, isDeleting = false;
  function tick() {
    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    if (!isDeleting) {
      charIndex += 1; el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) { isDeleting = true; setTimeout(tick, TYPEWRITER_SPEED.holdFull); return; }
      setTimeout(tick, TYPEWRITER_SPEED.typing); return;
    }
    charIndex -= 1; el.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length; setTimeout(tick, TYPEWRITER_SPEED.holdEmpty); return; }
    setTimeout(tick, TYPEWRITER_SPEED.deleting);
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = TYPEWRITER_PHRASES[0]; return; }
  tick();
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
  }));
}

function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.name.value.trim(), email = form.email.value.trim(), message = form.message.value.trim();
    if (!name || !email || !message) { status.textContent = 'Please fill out every field before sending.'; status.classList.add('is-error'); return; }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:sibsmith@bu.edu?subject=${subject}&body=${body}`;
    status.classList.remove('is-error'); status.textContent = 'Opening your email client…'; form.reset();
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel__dot'));
    const counter = carousel.querySelector('.carousel__counter');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!track || slides.length < 2) return;
    let index = 0;
    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };
    const go = delta => { index = (index + delta + slides.length) % slides.length; update(); };
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; update(); }));
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(1); }
    });
    let startX = null;
    carousel.addEventListener('pointerdown', e => { startX = e.clientX; });
    carousel.addEventListener('pointerup', e => {
      if (startX === null) return;
      const dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    });
    update();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeControl(); initTypewriter(); initMobileNav(); initScrollSpy(); initContactForm(); initFooterYear(); initCarousels();
});
