/* ============================================================
   JARWIX BRAND GUIDELINES — INTERACTIONS v2.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Progress Bar ----
  const progressBar = document.getElementById('progressBar');

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });

  // ---- Nav scroll effect ----
  const nav = document.getElementById('nav');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile menu toggle ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // ---- Reveal on scroll ----
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${i % 3 * 0.1}s`;
    revealObserver.observe(el);
  });

  // ---- Active nav link tracking ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? '#FFF5F0'
            : '';
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ---- Colour hex copy on click ----
  document.querySelectorAll('.colour-hex').forEach(hex => {
    hex.style.cursor = 'pointer';
    hex.title = 'Click to copy';

    hex.addEventListener('click', async () => {
      const value = hex.textContent.trim();
      try {
        await navigator.clipboard.writeText(value);
        const original = hex.textContent;
        hex.textContent = 'Copied!';
        hex.style.color = '#22c55e';
        setTimeout(() => {
          hex.textContent = original;
          hex.style.color = '';
        }, 1200);
      } catch {
        // Clipboard API may fail in some contexts
      }
    });
  });

  // ---- Gradient code copy ----
  document.querySelectorAll('.gradient-code').forEach(code => {
    code.style.cursor = 'pointer';
    code.title = 'Click to copy';

    code.addEventListener('click', async () => {
      const value = code.textContent.trim();
      try {
        await navigator.clipboard.writeText(value);
        const original = code.textContent;
        code.textContent = '✓ Copied to clipboard';
        code.style.color = '#22c55e';
        setTimeout(() => {
          code.textContent = original;
          code.style.color = '';
        }, 1200);
      } catch {
        // Clipboard API may fail
      }
    });
  });

  // ---- Hero Particles ----
  const heroParticles = document.getElementById('heroParticles');

  if (heroParticles) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${6 + Math.random() * 6}s`;
      particle.style.width = `${2 + Math.random() * 3}px`;
      particle.style.height = particle.style.width;
      heroParticles.appendChild(particle);
    }
  }

  // ---- Parallax-lite on hero grid ----
  const heroGrid = document.querySelector('.hero__grid');

  if (heroGrid && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroGrid.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // ---- Story timeline animation ----
  const storyChapters = document.querySelectorAll('.story-chapter');

  const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.3 });

  storyChapters.forEach((chapter, i) => {
    chapter.style.opacity = '0';
    chapter.style.transform = 'translateX(-20px)';
    chapter.style.transition = `all 0.6s ${0.15 * i}s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1))`;
    storyObserver.observe(chapter);
  });

  // ---- Counter animation for section numbers ----
  const sectionLabels = document.querySelectorAll('.section__label');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const final = parseInt(el.textContent);
        if (isNaN(final)) return;
        let current = 0;
        const step = () => {
          current++;
          el.textContent = current.toString().padStart(2, '0');
          if (current < final) requestAnimationFrame(step);
        };
        el.textContent = '00';
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  sectionLabels.forEach(label => counterObserver.observe(label));


  // ---- PDF Export ----
  const pdfBtn = document.getElementById('downloadPdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      pdfBtn.textContent = 'Preparing...';
      setTimeout(() => {
        window.print();
        pdfBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4 8l4 4 4-4M2 13h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Export PDF';
      }, 300);
    });
  }

  // ---- Hide keyboard hint on scroll ----
  const keyboardHint = document.getElementById('keyboardHint');
  let hintTimeout;
  if (keyboardHint) {
    hintTimeout = setTimeout(() => {
      keyboardHint.style.opacity = '0';
      keyboardHint.style.transition = 'opacity 0.5s ease';
    }, 10000);

    window.addEventListener('scroll', () => {
      if (keyboardHint.style.opacity !== '0') {
        keyboardHint.style.opacity = '0';
        keyboardHint.style.transition = 'opacity 0.5s ease';
        clearTimeout(hintTimeout);
      }
    }, { once: true, passive: true });
  }

  // ---- Custom Cursor ----
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const interactiveSelectors = 'a, button, .toc__item, .colour-hex, .gradient-code, [role="button"], .section-dot';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      });
    });
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > window.innerHeight * 0.8);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Section Dots Sidebar ----
  const sectionDotsNav = document.getElementById('sectionDots');
  if (sectionDotsNav) {
    const dotSectionLabels = {
      hero: 'Hero', toc: 'Contents', mission: 'Mission', overview: 'Overview',
      story: 'Story', colours: 'Colours', typography: 'Type', logo: 'Logo',
      iconography: 'Icons', imagery: 'Imagery', voice: 'Voice', pillars: 'Pillars',
      social: 'Social', applications: 'Applications', motion: 'Motion',
      downloads: 'Downloads', usage: 'Rules'
    };

    const dotSections = Array.from(document.querySelectorAll('section[id]'));

    dotSections.forEach(section => {
      const dot = document.createElement('button');
      dot.classList.add('section-dot');
      dot.setAttribute('data-label', dotSectionLabels[section.id] || section.id);
      dot.setAttribute('aria-label', `Go to ${dotSectionLabels[section.id] || section.id}`);
      dot.addEventListener('click', () => {
        window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
      });
      sectionDotsNav.appendChild(dot);
    });

    const dotEls = Array.from(sectionDotsNav.querySelectorAll('.section-dot'));

    const dotObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = dotSections.indexOf(entry.target);
          dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

    dotSections.forEach(s => dotObserver.observe(s));
  }

  // ---- TOC Active Item Tracking ----
  const tocItems = document.querySelectorAll('.toc__item');
  if (tocItems.length) {
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocItems.forEach(item => {
            item.classList.toggle('toc-active', item.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.35, rootMargin: '-80px 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(s => tocObserver.observe(s));
  }
});
