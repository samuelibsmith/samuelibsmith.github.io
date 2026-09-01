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

const TYPEWRITER_SPEED = {
  typing: 65,
  deleting: 35,
  holdFull: 1500,
  holdEmpty: 450
};

function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el || TYPEWRITER_PHRASES.length === 0) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timer;

  el.textContent = '';

  function tick() {
    const phrase = TYPEWRITER_PHRASES[phraseIndex];

    if (!isDeleting) {
      charIndex += 1;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        isDeleting = true;
        timer = setTimeout(tick, TYPEWRITER_SPEED.holdFull);
        return;
      }
      timer = setTimeout(tick, TYPEWRITER_SPEED.typing);
      return;
    }

    charIndex -= 1;
    el.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length;
      timer = setTimeout(tick, TYPEWRITER_SPEED.holdEmpty);
      return;
    }
    timer = setTimeout(tick, TYPEWRITER_SPEED.deleting);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = TYPEWRITER_PHRASES[0];
    return;
  }

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

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out every field before sending.';
      status.classList.add('is-error');
      return;
    }

    // Replace with your real address, or switch this to Formspree / another form service.
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;

    status.classList.remove('is-error');
    status.textContent = 'Opening your email client…';
    form.reset();
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initMobileNav();
  initScrollSpy();
  initContactForm();
  initFooterYear();
});
