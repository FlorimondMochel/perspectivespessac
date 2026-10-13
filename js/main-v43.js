// ---------- Menu overlay ----------
const menuToggle = document.getElementById('menuToggle');
const overlayNav = document.getElementById('overlayNav');
const overlayClose = document.getElementById('overlayClose');

const openNav = () => {
  overlayNav.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const closeNav = () => {
  overlayNav.classList.remove('open');
  document.body.style.overflow = '';
};

menuToggle.addEventListener('click', openNav);
overlayClose.addEventListener('click', closeNav);
overlayNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

// ---------- Apparition au scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));

// ---------- Menus déroulants (Vision / Nouveau / Vie d'église) ----------
document.querySelectorAll('.nav-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = trigger.closest('.nav-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.nav-item.open').forEach((el) => {
      el.classList.remove('open');
      el.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-item.open').forEach((el) => {
    el.classList.remove('open');
    el.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Vidéo Nouveau ? (lecture au clic) ----------
const introVideo = document.getElementById('introVideo');
const introVideoPoster = document.getElementById('introVideoPoster');
const introVideoPlayBtn = document.getElementById('introVideoPlayBtn');

if (introVideo && introVideoPoster && introVideoPlayBtn) {
  const playIntroVideo = () => {
    introVideoPoster.style.display = 'none';
    introVideoPlayBtn.style.display = 'none';
    introVideo.style.display = 'block';
    introVideo.play();
  };
  introVideoPoster.addEventListener('click', playIntroVideo);
  introVideoPlayBtn.addEventListener('click', playIntroVideo);
}

// ---------- Navigation active au scroll ----------
const navLinks = document.querySelectorAll('.top-nav a[href^="#"], .top-nav .nav-single[href^="#"], .overlay-links a[href^="#"]');
const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter((section, index, arr) => section && arr.indexOf(section) === index);

const setActiveLink = (id) => {
  document.querySelectorAll('.nav-trigger.active').forEach((el) => el.classList.remove('active'));
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isMatch);
    if (isMatch) {
      link.closest('.nav-item')?.querySelector('.nav-trigger')?.classList.add('active');
    }
  });
};

if (navSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-120px 0px -65% 0px', threshold: 0 }
  );
  navSections.forEach((section) => navObserver.observe(section));
}
