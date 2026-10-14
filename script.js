const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.question-card')];
const emptyState = document.getElementById('empty-state');

for (const button of filters) {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    for (const option of filters) {
      const active = option === button;
      option.classList.toggle('is-active', active);
      option.setAttribute('aria-pressed', String(active));
    }
    let visible = 0;
    for (const card of cards) {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
      if (!card.hidden) visible++;
    }
    emptyState.hidden = visible > 0;
  });
}

// Close the "More for KC" menu on outside click or Escape.
const kcMenu = document.querySelector('.kc-menu');
if (kcMenu) {
  document.addEventListener('click', (event) => {
    if (!kcMenu.contains(event.target)) kcMenu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && kcMenu.open) {
      kcMenu.open = false;
      kcMenu.querySelector('summary').focus();
    }
  });
}
