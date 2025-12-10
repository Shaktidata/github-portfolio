// Function to handle closing the modal, used by multiple events
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to the button that opened the modal
    if (modal.opener) {
      modal.opener.focus();
    }
    modal.opener = null; // Clear opener reference
  }
}

// Helper for project content - returns data object
function getProjectData(id) {
    if (id === 'p1') {
        return {
            title: 'Netflix Recommendation Engine',
            link: 'https://www.datascienceportfol.io/shaktic/projects/0',
            tag: 'Excel',
            details: 'This project uses a correlation matrix on simulated viewing data to quantify audience overlap between different TV shows. By identifying strong positive correlations, the analysis allows streaming platforms like Netflix to make relevant, genre-based recommendations (e.g., recommending Dark to Stranger Things viewers) to improve user engagement and retention.',
        };
    }
    if (id === 'p2') {
        return {
            title: 'Coming Soon',
            link: null, // No link yet
            tag: 'Power BI',
            details: 'An exciting project is on its way.',
        };
    }
    return { title: 'Project', details: 'Details coming soon.' };
}


document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const yearSpan = document.getElementById('year');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const modalTitle = document.getElementById('modalTitle');
  
  // Mobile Menu Toggle Logic
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // 1. Toggle the 'show' class for CSS styling
      navLinks.classList.toggle('show');
      
      // 2. Toggle the ARIA attribute for screen readers
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Update year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Project details modal opening
  document.querySelectorAll('.btn-light[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.proj;
      const data = getProjectData(id);

      if (modalContent && modal) {
        // Construct HTML using the returned data object
        let html = '';
        if (data.link) {
            html += `<h2><a href="${data.link}" target="_blank" rel="noopener">${data.title}</a></h2>`;
        } else {
            html += `<h2>${data.title}</h2>`;
        }
        if (data.tag) {
            html += `<p><strong>Tech:</strong> ${data.tag}</p>`;
        }
        html += `<p>${data.details}</p>`;

        modalContent.innerHTML = html;
        modalTitle.textContent = data.title; // Update the title for accessibility
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        
        // Store the button that opened the modal and shift focus
        modal.opener = btn;
        modalClose.focus();
      }
    });
  });

  // Close modal via close button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal via clicking outside the modal-body
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal via Escape key press (Accessibility)
  document.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('show') && e.key === 'Escape') {
      closeModal();
    }
  });

});
