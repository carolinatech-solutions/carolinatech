/* ==========================================================================
   TESTIMONIALS SLIDER CONTROLS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('slidePrev');
  const nextBtn = document.getElementById('slideNext');

  if (track && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const card = track.querySelector('.testi-card');
      return card ? card.offsetWidth + 24 : 380;
    };

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
  }
});
