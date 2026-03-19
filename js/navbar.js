function initNavbar() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1100) {
        e.preventDefault();
        const wasOpen = link.parentElement.classList.contains('open');
        navLinks.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
        if (!wasOpen) link.parentElement.classList.add('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    }
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  const current = window.location.pathname.split('/').pop();
  navLinks.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === current || href === '../' + current || href.endsWith('/' + current)) {
      const li = a.closest('li');
      li?.classList.add('active');
      const parentDropdown = li?.closest('.dropdown');
      if (parentDropdown) {
        parentDropdown.closest('.has-dropdown')?.classList.add('active');
      }
    }
  });
}
