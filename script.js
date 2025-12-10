// Small interactivity: menu toggle, modal for project details, year
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const yearSpan = document.getElementById('year');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');

  // Optional: menu button only if it exists
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Update year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Project details modal
  document.querySelectorAll('.btn-light[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.proj;
      if (modalContent && modal) {
        modalContent.innerHTML = getProjectContent(id);
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Close modal
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Helper for project content
  function getProjectContent(id) {
    if (id === 'p1') {
      return `<h2>Netflix Recommendation Engine</h2>
              <p>This project uses a correlation matrix on simulated viewing data to quantify audience overlap between different TV shows. By identifying strong positive correlations, the analysis allows streaming platforms like Netflix to make relevant, genre-based recommendations (e.g., recommending Dark to Stranger Things viewers) to improve user engagement and retention.</p>
              <p><strong>Tech:</strong>Excel</p>`;
    }
    if (id === 'p2') {
      return `<h2>Coming Soon</h2>
              <p>An exciting projects is on its way.</p>
              <p><strong>Tech:</strong> PowerBI</p>`;
    }
    return `<h2>Project</h2><p>Details coming soon.</p>`;
  }
});
