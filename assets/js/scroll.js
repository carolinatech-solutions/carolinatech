/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for reveal transitions
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});
