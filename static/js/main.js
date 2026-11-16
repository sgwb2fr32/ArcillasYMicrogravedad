/* ===========================
   STARS CANVAS
   =========================== */
function createStars(containerId, count = 120) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.classList.add('stars-canvas');
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let stars = [];
  let animFrame;

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const flicker = s.opacity + Math.sin(t * 0.001 * s.speed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 230, 255, ${Math.max(0, Math.min(1, flicker))})`;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  animFrame = requestAnimationFrame(draw);
}

createStars('stars', 140);
createStars('stars2', 80);
createStars('stars3', 100);

/* ===========================
   SCROLL REVEAL
   =========================== */
const revealEls = document.querySelectorAll(
  '.toc-card, .info-card, .arcilla-card, .power-item, .flow-item, .compare-card, .question-card, .sim-item, .case-study'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.children);
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.padding = '0.6rem 2.5rem';
  } else {
    navbar.style.padding = '1rem 2.5rem';
  }
});

/* ===========================
   BOTON DE NAVEGACIÓN
   =========================== */
const boton_nav = document.getElementById('boton-nav');
const navLinks = document.querySelector('.nav-links');

boton_nav.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===========================
   ACTIVE NAV HIGHLIGHT
   =========================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--teal)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   PARALLAX ORBS (subtle)
   =========================== */
document.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.hero-orb');
  const mx = (e.clientX / window.innerWidth - 0.5) * 20;
  const my = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
  });

  const mols = document.querySelectorAll('.molecule-float');
  mols.forEach((m, i) => {
    const f = (i + 1) * 0.15;
    m.style.transform = `translate(${mx * f}px, ${my * f}px)`;
  });
});
