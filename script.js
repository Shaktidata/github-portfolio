// Function to handle closing the modal
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    // FIX: Use the opener reference if available to return focus for accessibility
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


  // Set current year in the footer
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile menu toggle & Focus FIX
  if (menuToggle) menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const links = navLinks.querySelectorAll('a');

      navLinks.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', !isExpanded);

      // Accessibility FIX: If menu is opened, focus on the first link
      if (!isExpanded && links.length > 0) {
        links[0].focus();
      }
  });
  
  // Close menu when a link is clicked (single-page navigation)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 880) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus(); // Return focus to the toggle button
      }
    });
  });

  // Modal logic
  document.querySelectorAll('.btn-light[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.proj;
      const data = getProjectData(id);
      if (modalContent && modal) {
        // Use an anchor tag for the project link if it exists
        let html = data.link ? 
            `<h2><a href="${data.link}" target="_blank" rel="noopener noreferrer">${data.title}</a></h2>` : 
            `<h2>${data.title}</h2>`;
        
        if (data.tag) html += `<p><strong>Tech:</strong> ${data.tag}</p>`;
        html += `<p>${data.details}</p>`;
        
        modalContent.innerHTML = html;
        modalTitle.textContent = data.title;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden','false');
        modal.opener = btn; // Store the button that opened the modal for focus return
        modalClose.focus();
      }
    });
  });

  // Modal close event listeners
  if (modalClose) modalClose.addEventListener('click', closeModal);
  // Close modal when clicking outside (on the overlay)
  if (modal) modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
  // Close modal when pressing Escape key
  document.addEventListener('keydown', e => { if(modal && modal.classList.contains('show') && e.key==='Escape') closeModal(); });

  // -----------------------
  // Unified Scroll-trigger animations
  // -----------------------
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        
        // Skill Bar Animation Logic (Correctly applied to elements with 'skill-card')
        if(entry.target.classList.contains('skill-card')){
          const fill = entry.target.querySelector('.fill');
          // Applies the calculated width from CSS root variables
          fill.style.width = getComputedStyle(fill).getPropertyValue('--w'); 
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target ALL elements for animation using the single observer
  document.querySelectorAll('.timeline-item, .project-card, .skill-card, .cards .card, .cert-grid .cert').forEach(el => observer.observe(el));
});
