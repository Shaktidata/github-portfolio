// Function to handle closing the modal
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    if (modal.opener) modal.opener.focus();
    modal.opener = null;
  }
}

// Helper for project content
function getProjectData(id) {
    if (id === 'p1') return {
        title: 'Netflix Recommendation Engine',
        link: 'https://www.datascienceportfol.io/shaktic/projects/0',
        tag: 'Excel',
        details: 'This project uses a correlation matrix on simulated viewing data to quantify audience overlap between different TV shows. By identifying strong positive correlations, the analysis allows streaming platforms like Netflix to make relevant, genre-based recommendations to improve engagement and retention.',
    };
    if (id === 'p2') return {
        title: 'Coming Soon',
        link: null,
        tag: 'Power BI',
        details: 'An exciting project is on its way.',
    };
    return { title: 'Project', details: 'Details coming soon.' };
}

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const yearSpan = document.getElementById('year');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const modalTitle = document.getElementById('modalTitle');

  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      navLinks.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', !isExpanded);
  });
  
// Animate cards on scroll into view
const animateOnScroll = (selector) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
};

// Apply to experience, projects, education, certifications
animateOnScroll('.timeline-item .content');
animateOnScroll('.project-card');
animateOnScroll('.cards .card');
animateOnScroll('.cert-grid .cert');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Modal logic
  document.querySelectorAll('.btn-light[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.proj;
      const data = getProjectData(id);
      if (modalContent && modal) {
        let html = data.link ? `<h2><a href="${data.link}" target="_blank">${data.title}</a></h2>` : `<h2>${data.title}</h2>`;
        if (data.tag) html += `<p><strong>Tech:</strong> ${data.tag}</p>`;
        html += `<p>${data.details}</p>`;
        modalContent.innerHTML = html;
        modalTitle.textContent = data.title;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden','false');
        modal.opener = btn;
        modalClose.focus();
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e => { if(modal && modal.classList.contains('show') && e.key==='Escape') closeModal(); });

  // -----------------------
  // Scroll-trigger animations
  // -----------------------
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        if(entry.target.classList.contains('skill-card')){
          const fill = entry.target.querySelector('.fill');
          fill.style.width = getComputedStyle(fill).getPropertyValue('--w');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item, .project-card, .skill-card').forEach(el => observer.observe(el));
});
