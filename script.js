// Project filter tabs + Show More toggle
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
const showMoreBtn = document.getElementById('showMoreBtn');
const showMoreLabel = document.getElementById('showMoreLabel');
const VISIBLE_LIMIT = 4;
let expanded = false;
let currentFilter = 'all';

function renderCards() {
  const matching = Array.from(cards).filter(card =>
    currentFilter === 'all' || card.dataset.category === currentFilter
  );
  cards.forEach(card => card.classList.toggle('hidden', !matching.includes(card)));

  const showToggle = currentFilter === 'all' && matching.length > VISIBLE_LIMIT;
  showMoreBtn.style.display = showToggle ? 'flex' : 'none';

  matching.forEach((card, i) => {
    const shouldCollapse = showToggle && !expanded && i >= VISIBLE_LIMIT;
    card.classList.toggle('extra-collapsed', shouldCollapse);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    expanded = false;
    showMoreBtn.classList.remove('expanded');
    showMoreLabel.textContent = 'Show More';
    renderCards();
  });
});

showMoreBtn.addEventListener('click', () => {
  expanded = !expanded;
  showMoreBtn.classList.toggle('expanded', expanded);
  showMoreLabel.textContent = expanded ? 'Show Less' : 'Show More';
  renderCards();
});

renderCards();

// Animate skill bars shortly after page load
const skillFills = document.querySelectorAll('.skill-fill');
window.addEventListener('load', () => {
  setTimeout(() => {
    skillFills.forEach(el => {
      el.style.width = el.dataset.width + '%';
    });
  }, 300);
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Scroll-reveal animation for sections, cards, and content blocks
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#navLinks a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Newsletter form (front-end only — no backend connected yet)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    input.value = '';
    input.placeholder = 'Thanks for subscribing!';
  });
}
