/* ==========================================================================
   NAVBAR & FAB MENUS (NAVIGATION INTERACTIONS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Active Navigation Link Scroll Highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll('section, [id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinksList.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // Sticky Nav scrolled shadow/height classes
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Floating Action Button (FAB) Stack Menu Toggle
  const fsTrigger = document.getElementById('fsTrigger');
  const floatingSocials = document.getElementById('floatingSocials');

  if (fsTrigger && floatingSocials) {
    fsTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingSocials.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!floatingSocials.contains(e.target)) {
        floatingSocials.classList.remove('active');
      }
    });
  }
});
