/* ============================================================
   CAROLINATECH V2 — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────
   1. PARTICLE CANVAS
   ───────────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animId;
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x   = Math.random() * W;
    this.y   = Math.random() * H;
    this.r   = Math.random() * 1.5 + 0.4;
    this.vx  = (Math.random() - 0.5) * 0.35;
    this.vy  = (Math.random() - 0.5) * 0.35;
    this.a   = Math.random() * 0.5 + 0.15;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  };

  function init() {
    resize();
    particles = [];
    const count = Math.min(Math.floor((W * H) / 14000), 80);
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife; // stagger start
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.life++;
      if (p.life > p.maxLife) p.reset();

      // fade in / out
      const progress = p.life / p.maxLife;
      const opacity  = p.a * Math.sin(Math.PI * progress);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37, 99, 235, ${opacity})`;
      ctx.fill();

      // draw connecting lines
      particles.forEach(q => {
        if (q === p) return;
        const dx   = p.x - q.x;
        const dy   = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.25 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      p.x += p.vx;
      p.y += p.vy;
    });

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    draw();
  });

  init();
  draw();
})();

/* ─────────────────────────────────────────────────────────
   2. NAVBAR — TRANSPARENT → STICKY
   ───────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navItems  = navLinks ? navLinks.querySelectorAll('a') : [];

  if (!navbar) return;

  // Scroll state
  function updateNav() {
    if (window.scrollY > 60) {
      navbar.classList.remove('transparent');
      navbar.classList.add('sticky');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('sticky');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Active link highlighting
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navItems.forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();

/* ─────────────────────────────────────────────────────────
   3. ANIMATED COUNTERS
   ───────────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  let started = false;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    if (started) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        started = true;
        counters.forEach(c => animateCounter(c));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) observer.observe(statsSection);
})();

/* ─────────────────────────────────────────────────────────
   4. SCROLL REVEAL
   ───────────────────────────────────────────────────────── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────────────────
   5. HERO PARALLAX
   ───────────────────────────────────────────────────────── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        heroBg.style.transform = `translateY(${sy * 0.3}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─────────────────────────────────────────────────────────
   6. BUTTON RIPPLE EFFECT
   ───────────────────────────────────────────────────────── */
(function initRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn, .btn-primary, .btn-secondary, .btn-outline, .btn-cta-white, .nav-cta');
    if (!btn) return;

    const circle = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    circle.className = 'ripple-circle';
    circle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;

    // Ensure btn is positioned
    const pos = window.getComputedStyle(btn).position;
    if (pos === 'static') btn.style.position = 'relative';

    btn.style.overflow = 'hidden';
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
  });
})();

/* ─────────────────────────────────────────────────────────
   7. CONTACT FORM — WEB3FORMS SUBMISSION
   ───────────────────────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-submit');

  function setBtn(state) {
    const states = {
      idle: {
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                 <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
               </svg> Send Request`,
        bg: '', color: '', disabled: false,
      },
      loading: {
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                 style="animation:spin 0.8s linear infinite;">
                 <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
               </svg> Sending…`,
        bg: 'rgba(255,255,255,0.7)', color: '#1D4ED8', disabled: true,
      },
      success: {
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M20 6L9 17l-5-5"/>
               </svg> Message Sent!`,
        bg: '#16a34a', color: '#fff', disabled: true,
      },
      error: {
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                 <line x1="12" y1="16" x2="12.01" y2="16"/>
               </svg> Failed — Try Again`,
        bg: '#dc2626', color: '#fff', disabled: false,
      },
    };

    const s = states[state];
    submitBtn.innerHTML        = s.html;
    submitBtn.style.background = s.bg;
    submitBtn.style.color      = s.color;
    submitBtn.disabled         = s.disabled;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic client-side validation
    const name  = form.querySelector('#inputName');
    const email = form.querySelector('#inputEmail');
    if (!name.value.trim() || !email.value.trim()) {
      name.style.borderColor  = name.value.trim()  ? '' : 'rgba(239,68,68,0.7)';
      email.style.borderColor = email.value.trim() ? '' : 'rgba(239,68,68,0.7)';
      return;
    }

    setBtn('loading');

    try {
      const data = new FormData(form);

      // Key assembled at runtime — not stored in HTML source
      const _k = ['c2e04546', '3172', '4232', 'a0ce', '8bf85a8535b5'];
      data.append('access_key', _k.join('-'));

      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body:   data,
      });
      const json = await res.json();

      if (json.success) {
        setBtn('success');
        form.reset();
        setTimeout(() => setBtn('idle'), 5000);
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Web3Forms error:', err);
      setBtn('error');
      setTimeout(() => setBtn('idle'), 5000);
    }
  });

  // Clear red borders on input
  form.querySelectorAll('.form-input').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });
})();

/* ─────────────────────────────────────────────────────────
   8. SMOOTH SCROLL FOR ANCHOR LINKS
   ───────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ─────────────────────────────────────────────────────────
   9. CONTACT BUBBLE POPUP
   ───────────────────────────────────────────────────────── */
(function initContactBubble() {
  const wrap  = document.getElementById('contactBubbleWrap');
  const btn   = document.getElementById('contactBubbleBtn');
  const popup = document.getElementById('contactBubblePopup');
  if (!wrap || !btn || !popup) return;

  function openBubble() {
    wrap.classList.add('open');
    popup.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeBubble() {
    wrap.classList.remove('open');
    popup.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    wrap.classList.contains('open') ? closeBubble() : openBubble();
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) closeBubble();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBubble();
  });
})();

/* ─────────────────────────────────────────────────────────
   10. HERO SLIDESHOW
   ───────────────────────────────────────────────────────── */
(function initHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  if (!container) return;

  // Start with slides already in HTML
  const loadedSlides = Array.from(container.querySelectorAll('.hero-slide'));
  let slideIndex = loadedSlides.length + 1; // start probing for slide3

  function probeNextSlide() {
    const exts = ['.jpg', '.png', '.jpeg'];
    let extIndex = 0;

    function tryLoad() {
      if (extIndex >= exts.length) {
        // No more images found, start the slideshow
        startSlideshow();
        return;
      }
      
      const img = new Image();
      img.src = `assets/images/slide${slideIndex}${exts[extIndex]}`;
      
      img.onload = () => {
        img.className = 'hero-slide';
        img.alt = `Hero Slide ${slideIndex}`;
        img.loading = 'lazy';
        
        // Insert before the glow overlay
        const glow = container.querySelector('.hero-blue-glow');
        if (glow) {
          container.insertBefore(img, glow);
        } else {
          container.appendChild(img);
        }
        loadedSlides.push(img);
        
        slideIndex++;
        probeNextSlide();
      };
      
      img.onerror = () => {
        extIndex++;
        tryLoad();
      };
    }

    tryLoad();
  }

  function startSlideshow() {
    if (loadedSlides.length <= 1) return;
    let currentIndex = 0;
    setInterval(() => {
      loadedSlides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % loadedSlides.length;
      loadedSlides[currentIndex].classList.add('active');
    }, 5000);
  }

  // Begin scanning for additional images
  probeNextSlide();
})();
