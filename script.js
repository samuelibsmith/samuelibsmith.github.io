/* ==========================================================================
   CONFIG — edit these values, no need to touch the logic below
   ========================================================================== */
const TYPEWRITER_PHRASES = [
  // TODO: Replace these with your actual titles / roles.
  // The typewriter will cycle through them forever.
  'Software Engineer',
  'Full-Stack Developer',
  'CS Student @ University Name',
  'Open-Source Contributor'
];

const TYPEWRITER_SPEED = {
  typing: 65,     // ms per character while typing
  deleting: 35,   // ms per character while deleting
  holdFull: 1400, // pause after a phrase is fully typed
  holdEmpty: 400  // pause after a phrase is fully deleted
};

/* ==========================================================================
   TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el || TYPEWRITER_PHRASES.length === 0) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, TYPEWRITER_SPEED.holdFull);
        return;
      }
      setTimeout(tick, TYPEWRITER_SPEED.typing);
    } else {
      charIndex--;
      el.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % TYPEWRITER_PHRASES.length;
        setTimeout(tick, TYPEWRITER_SPEED.holdEmpty);
        return;
      }
      setTimeout(tick, TYPEWRITER_SPEED.deleting);
    }
  }

  // Respect users who've asked for reduced motion: show the first phrase
  // statically instead of animating forever.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = TYPEWRITER_PHRASES[0];
    return;
  }

  tick();
}

/* ==========================================================================
   MOBILE NAV TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu whenever a link is tapped (mobile UX nicety)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   ACTIVE NAV LINK ON SCROLL
   Highlights the nav item for whichever section is currently in view.
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   CONTACT FORM
   This is a front-end-only stub. Pick ONE of the two options below to make
   it actually deliver messages to your inbox:

   OPTION A — Formspree (easiest, no backend required)
     1. Create a free form at https://formspree.io
     2. Set the <form> tag's action="https://formspree.io/f/yourFormId"
        and method="POST" in index.html
     3. Delete the preventDefault()/fetch logic below and let the form
        submit normally (or keep it and fetch() your Formspree endpoint
        with FormData, per their docs, to avoid a page reload)

   OPTION B — mailto fallback (zero setup, opens the visitor's email client)
     Already wired up below as the default behavior.
   ========================================================================== */
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

    // TODO: Replace 'your.email@example.com' with your real address,
    // or swap this whole block for a Formspree fetch() call (see above).
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;

    status.classList.remove('is-error');
    status.textContent = 'Opening your email client…';
    form.reset();
  });
}

/* ==========================================================================
   FOOTER YEAR
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initMobileNav();
  initScrollSpy();
  initContactForm();
  initFooterYear();
});
