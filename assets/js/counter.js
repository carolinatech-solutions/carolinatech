/* ==========================================================================
   STATS COUNTER ANIMATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Stats Counter Animation Observer
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 150;
            const inc = target / speed;

            if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 15);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    counterObs.observe(statsBar);
  }
});
