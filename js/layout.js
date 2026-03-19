function getNavHTML(base) {
  base = base || '';
  return `
  <div class="topbar">
    <div class="topbar-left">
      <span>&#128222; +91 8415075655 / 7635840435 / 9365244195</span>
      <span>&#128231; gurukulgroup2017@gmail.com</span>
    </div>
    <div class="topbar-right">
      <a href="${base}pages/events.html#noticeboard">Notice Board</a>
      <a href="https://www.youtube.com/channel/UC7Iuu-Aq91HIyqy3w_Kpe2g" target="_blank" rel="noopener">YouTube</a>
      <a href="https://www.facebook.com/gurukulgroupmangaldoi/" target="_blank" rel="noopener">Facebook</a>
    </div>
  </div>
  <nav class="navbar">
    <div class="nav-logo">
      <a href="${base}index.html">
        <img
          src="https://res.cloudinary.com/dsfgnnpho/image/upload/v1773926805/logo_daoq6o.png"
          alt="Gurukul Group of Education Wing"
          class="nav-logo-img animate__animated"
          onmouseover="this.classList.add('animate__pulse')"
          onmouseout="this.classList.remove('animate__pulse')"
        >
      </a>
      <a href="${base}index.html">
        <div class="nav-logo-text">
          <strong>Gurukul Group of Education Wing</strong>
          <span>Affiliated to CBSE &bull; Est. 2017</span>
        </div>
      </a>
    </div>
    <button class="nav-toggle" id="navToggle">&#9776;</button>
    <ul class="nav-links" id="navLinks">
      <li class="has-dropdown">
        <a href="#">About <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li><a href="${base}pages/about.html">About Us</a></li>
          <li><a href="${base}pages/mission.html">Mission &amp; Vision</a></li>
          <li><a href="${base}pages/principals-message.html">Principal's Message</a></li>
          <li><a href="${base}pages/founders-message.html">Founder's Message</a></li>
          <li><a href="${base}pages/affiliation.html">Affiliation</a></li>
        </ul>
      </li>
      <li class="has-dropdown">
        <a href="#">Admission <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li><a href="${base}pages/procedure.html">Procedure</a></li>
          <li><a href="${base}pages/admission.html">Admission Form</a></li>
        </ul>
      </li>
      <li class="has-dropdown">
        <a href="#">Academics <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li><a href="${base}pages/curriculum.html">Curriculum</a></li>
          <li><a href="${base}pages/calendar.html">Academic Calendar</a></li>
          <li><a href="${base}pages/events.html">Events &amp; Celebrations</a></li>
        </ul>
      </li>
      <li><a href="${base}pages/staff.html">Staff</a></li>
      <li class="has-dropdown">
        <a href="#">Our School <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li><a href="${base}pages/infrastructure.html">Infrastructure</a></li>
          <li><a href="${base}pages/hostel.html">Hostel</a></li>
          <li><a href="${base}pages/achievements.html">Achievements</a></li>
          <li><a href="${base}pages/gallery.html">Gallery</a></li>
        </ul>
      </li>
      <li><a href="${base}pages/contact.html">Contact</a></li>
      <li style="margin-left:16px;"><a href="${base}pages/disclosure.html">MPD Notice</a></li>
    </ul>
  </nav>`;
}

function getFooterHTML(base) {
  base = base || '';
  return `
  <footer class="site-footer">
    <div class="footer-grid container">
      <div class="footer-brand">
        <!-- UPDATE: Replace text logo with image when ready:
             <img src="${base}images/logo.png" alt="Gurukul Logo" style="height:60px;margin-bottom:12px;"> -->
        <img src="https://res.cloudinary.com/dsfgnnpho/image/upload/v1773926805/logo_daoq6o.png" alt="Gurukul Logo" style="width:100px;height:auto;margin-bottom:4px;filter:brightness(0) invert(1);">
        <strong>Gurukul Group of Education Wing</strong>
        <p>CBSE Affiliated (No. 230192) | Co-educational<br>
        School Code: 35422<br>
        A flagship project of Durlav Foundation<br>
        Reg. No. DAR/247/K/46, Govt. of Assam</p>
      </div>
      <div>
        <h4>About</h4>
        <ul>
          <li><a href="${base}pages/about.html">About Us</a></li>
          <li><a href="${base}pages/mission.html">Mission &amp; Vision</a></li>
          <li><a href="${base}pages/principals-message.html">Principal's Message</a></li>
          <li><a href="${base}pages/founders-message.html">Founder's Message</a></li>
          <li><a href="${base}pages/affiliation.html">Affiliation</a></li>
        </ul>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="${base}pages/procedure.html">Admission Procedure</a></li>
          <li><a href="${base}pages/curriculum.html">Curriculum</a></li>
          <li><a href="${base}pages/calendar.html">Academic Calendar</a></li>
          <li><a href="${base}pages/infrastructure.html">Infrastructure</a></li>
          <li><a href="${base}pages/hostel.html">Hostel</a></li>
          <li><a href="${base}pages/disclosure.html">MPD Notice</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul class="footer-contact-list">
          <li><span>&#128231;</span> <a href="mailto:gurukulgroup2017@gmail.com" target="_blank" rel="noopener" style="color:rgba(255,255,255,0.55);transition:color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">gurukulgroup2017@gmail.com</a></li>
          <li><span>&#128231;</span> <a href="mailto:info@gurukulgroup.in" target="_blank" rel="noopener" style="color:rgba(255,255,255,0.55);transition:color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">info@gurukulgroup.in</a></li>
          <li><span>&#128222;</span> <a href="tel:+918415075655" style="color:rgba(255,255,255,0.55);transition:color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">+91 8415075655</a></li>
          <li><span>&#128222;</span> <a href="tel:+917635840435" style="color:rgba(255,255,255,0.55);transition:color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">+91 7635840435</a></li>
          <li><span>&#128222;</span> <a href="tel:+919365244195" style="color:rgba(255,255,255,0.55);transition:color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">+91 9365244195</a></li>
          <li><span>&#128205;</span> <a href="https://maps.google.com/maps?ll=26.430429,91.979228&z=16&q=Gurukul+Group+of+Educational+wing" target="_blank" rel="noopener" style="color:rgba(255,255,255,0.55);transition:color 0.2s ease;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">NA-Howly, Barathiabari,<br>P.O Janaram Chowka,<br>Mangaldoi, Assam &mdash; 784529 &#8599;</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom container">
      <span>Copyright &copy; 2026 Gurukul Group of Education Wing. All rights reserved.</span>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const isInPages = window.location.pathname.includes('/pages/');
  const base = isInPages ? '../' : '';

  const navTarget = document.getElementById('nav-placeholder');
  const footerTarget = document.getElementById('footer-placeholder');

  if (navTarget) navTarget.innerHTML = getNavHTML(base);
  if (footerTarget) footerTarget.innerHTML = getFooterHTML(base);

  const animateCSS = document.createElement('link');
  animateCSS.rel = 'stylesheet';
  animateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
  document.head.appendChild(animateCSS);

  const aosCSS = document.createElement('link');
  aosCSS.rel = 'stylesheet';
  aosCSS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
  document.head.appendChild(aosCSS);

  const navScript = document.createElement('script');
  navScript.src = base + 'js/navbar.js';
  navScript.onload = () => {
    initNavbar();
    const aosJS = document.createElement('script');
    aosJS.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosJS.onload = () => AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true, offset: 60 });
    document.body.appendChild(aosJS);
  };
  document.body.appendChild(navScript);
});
