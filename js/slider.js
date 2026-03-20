document.addEventListener('DOMContentLoaded', async () => {
  const hero = document.querySelector('.hero');
  const dotsContainer = document.getElementById('sliderDots');
  if (!hero || !dotsContainer) return;

  const sliderTrack = hero.querySelector('.slider-track');
  if (!sliderTrack) return;

  let current = 0;
  let timer;
  let slides = [];
  let dots = [];

  function buildSlider(images) {
    sliderTrack.innerHTML = '';
    dotsContainer.innerHTML = '';

    images.forEach((img, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = `<img src="${img.url}" alt="Gurukul Campus" loading="${i === 0 ? 'eager' : 'lazy'}">`;
      sliderTrack.appendChild(slide);

      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsContainer.appendChild(dot);
    });

    slides = sliderTrack.querySelectorAll('.slide');
    dots = dotsContainer.querySelectorAll('.slider-dot');

    addArrows();
    addSwipe();
    resetTimer();
  }

  function addArrows() {
    hero.querySelectorAll('.slider-arrow').forEach(a => a.remove());
    const prev = document.createElement('button');
    const next = document.createElement('button');
    prev.className = 'slider-arrow slider-prev';
    next.className = 'slider-arrow slider-next';
    prev.innerHTML = '&#8592;';
    next.innerHTML = '&#8594;';
    prev.addEventListener('click', () => { goTo((current - 1 + slides.length) % slides.length); resetTimer(); });
    next.addEventListener('click', () => { goTo((current + 1) % slides.length); resetTimer(); });
    hero.appendChild(prev);
    hero.appendChild(next);
  }

  function addSwipe() {
    let touchStartX = 0;
    hero.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
        resetTimer();
      }
    }, { passive: true });
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo((current + 1) % slides.length), 4500);
  }

  function fallback() {
    slides = hero.querySelectorAll('.slide');
    if (!slides.length) return;
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsContainer.appendChild(dot);
    });
    dots = dotsContainer.querySelectorAll('.slider-dot');
    addArrows();
    addSwipe();
    resetTimer();
  }

  try {
    const res = await fetch('/.netlify/functions/hero');
    if (!res.ok) throw new Error('Non-200 response');
    const images = await res.json();
    if (images && images.length) {
      buildSlider(images);
    } else {
      fallback();
    }
  } catch (e) {
    console.warn('Hero function failed, using fallback:', e.message);
    fallback();
  }
});
