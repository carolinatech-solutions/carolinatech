/* ==========================================================================
   FAQ ACCORDION TOGGLE
   ========================================================================== */

/**
 * Toggles a FAQ item open/close.
 * @param {HTMLElement} btn The clicked FAQ button.
 */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all other FAQs
  document.querySelectorAll('.faq-question.open').forEach(q => {
    q.classList.remove('open');
    q.setAttribute('aria-expanded', 'false');
    q.nextElementSibling.classList.remove('open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

// Expose globally for inline onclick handlers in index.html
window.toggleFaq = toggleFaq;
