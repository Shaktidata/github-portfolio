// script.js - lightweight interactions (nav toggle, smooth scroll, modal)
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('open');
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Project details modal
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const detailsButtons = Array.from(document.querySelectorAll('.details-btn'));
  const modalClose = document.getElementById('modal-close');
  const modalOk = document.getElementById('modal-ok');

  function openModal(title, tech, desc) {
    modalTitle.textContent = title;
    modalTech.textContent = tech;
    modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  detailsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      if (!card) return;
      const title = card.dataset.title || card.querySelector('h3')?.innerText || 'Project';
      const tech = card.dataset.tech || '';
      const desc = card.dataset.desc || card.querySelector('.project-excerpt')?.innerText || '';
      openModal(title, tech, desc);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOk.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // contact form fallback behavior — no backend on static site
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // let default behaviour continue (redirects to thank-you.html),
      // but if you prefer to intercept you could do AJAX here.
      // For static sites, simple redirect via GET works well.
    });
  }
});
