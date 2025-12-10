// Small interactivity: menu toggle, modal for project details, year, theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const yearSpan = document.getElementById('year');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const themeToggle = document.getElementById('themeToggle');

  yearSpan.textContent = new Date().getFullYear();

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // project details (simple demo)
  document.querySelectorAll('.btn-light[data-proj]').forEach(btn => {
    btn.addEventListener('click', evt => {
      const id = btn.dataset.proj;
      modalContent.innerHTML = getProjectContent(id);
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  });

  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }
  });

  // theme toggle: simple inversion (keeps vibrant palette)
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
  });

  // helper to return project content
  function getProjectContent(id) {
    if (id === 'p1') {
      return `<h2>Inventory Forecasting</h2><p>Full Power BI dashboard and forecasting model that integrated sales history, lead times and promotions to reduce stockouts by 15%.</p><p><strong>Tech:</strong> Power BI, SQL, Excel</p>`;
    }
    if (id === 'p2') {
      return `<h2>Order Analysis Toolkit</h2><p>A Python package to clean and analyze order and fulfillment data; includes edge-case handling and summary reports.</p><p><strong>Tech:</strong> Python, Pandas</p>`;
    }
    return `<h2>Project</h2><p>Details coming soon.</p>`;
  }
});
