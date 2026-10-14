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

const answerDetails = [...document.querySelectorAll('.answer-detail')];
document.getElementById('expand-all').addEventListener('click', () => {
  filters.find(button => button.dataset.filter === 'all').click();
  for (const detail of answerDetails) detail.open = true;
});
document.getElementById('collapse-all').addEventListener('click', () => {
  for (const detail of answerDetails) detail.open = false;
});

let stateBeforePrint;
window.addEventListener('beforeprint', () => {
  const details = [...document.querySelectorAll('details')];
  stateBeforePrint = details.map(detail => detail.open);
  for (const detail of details) detail.open = true;
});
window.addEventListener('afterprint', () => {
  if (!stateBeforePrint) return;
  document.querySelectorAll('details').forEach((detail, i) => {
    detail.open = stateBeforePrint[i];
  });
  stateBeforePrint = undefined;
});

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
