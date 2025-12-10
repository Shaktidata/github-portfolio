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
      return `<h2>Inventory Forecasting</h2>
              <p>Full Power BI dashboard and forecasting model that integrated sales history, lead times and promotions to reduce stockouts by 15%.</p>
              <p><strong>Tech:</strong> Power BI, SQL, Excel</p>`;
    }
    if (id === 'p2') {
      return `<h2>Order Analysis Toolkit</h2>
              <p>A Python package to clean and analyze order and fulfillment data; includes edge-case handling and summary reports.</p>
              <p><strong>Tech:</strong> Python, Pandas</p>`;
    }
    return `<h2>Project</h2><p>Details coming soon.</p>`;
  }
});
