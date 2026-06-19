document.addEventListener('DOMContentLoaded', () => {

  // ── MOBILE NAV ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── HERO SLIDESHOW ──
  // Auto-advances every 5 seconds. Arrows go back/forward. Swipe works on mobile.
  const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
  const prevBtn    = document.getElementById('heroPrev');
  const nextBtn    = document.getElementById('heroNext');

  if (heroSlides.length > 1) {
    let idx = 0;
    let timer = null;

    function goTo(n) {
      heroSlides[idx].classList.remove('active');
      idx = ((n % heroSlides.length) + heroSlides.length) % heroSlides.length;
      heroSlides[idx].classList.add('active');
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(idx + 1), 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(idx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(idx + 1));

    // Swipe support
    let touchX = null;
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      heroEl.addEventListener('touchstart', e => {
        touchX = e.touches[0].clientX;
      }, { passive: true });
      heroEl.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = touchX - e.changedTouches[0].clientX;
        if (dx > 40)  goTo(idx + 1);
        if (dx < -40) goTo(idx - 1);
        touchX = null;
      }, { passive: true });
    }

    resetTimer();
  }

  // ── CONTACT FORM ──
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const res  = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form)
        });
        const json = await res.json();
        if (json.success && successMsg) {
          form.style.display = 'none';
          successMsg.style.display = 'block';
        }
      } catch (err) {
        console.error('Form error:', err);
      }
    });
  }

});
