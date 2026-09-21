/**
 * Space Station Coworking — Interactive & Apple HIG Polish Engine
 * Features:
 * - Dynamic scroll-aware sticky header
 * - Native 3D perspective card micro-tilt with prefers-reduced-motion check
 * - FAQ interactive accordion
 * - Direct WhatsApp tour & inquiry dispatch (+92 310 4004001)
 * - Mobile drawer navigation with accessible ARIA states
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initTiltCards();
  initFaqAccordion();
  initContactForm();
  initStatCounters();
});

/* --- 1. Sticky Header Scroll Behavior --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- 2. Accessible Mobile Navigation --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggleBtn.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  // Close menu when clicking outside or navigating
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    }
  });
}

/* --- 3. Subtle CSS 3D Perspective Hover Tilt (Respects Reduced Motion) --- */
function initTiltCards() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* --- 4. Interactive FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((other) => other.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* --- 5. Contact / Inquiry Form Handler with Direct WhatsApp Redirect --- */
function initContactForm() {
  const form = document.getElementById('tour-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    const name = form.querySelector('[name="name"]')?.value.trim() || 'Prospective Member';
    const email = form.querySelector('[name="email"]')?.value.trim() || 'Not specified';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || 'Not specified';
    const planSelect = form.querySelector('[name="plan"]');
    const planText = planSelect ? planSelect.options[planSelect.selectedIndex].text : 'General Inquiry';
    const message = form.querySelector('[name="message"]')?.value.trim() || 'Hello, I would like to book a tour of Space Station.';

    btn.disabled = true;
    btn.innerHTML = 'Connecting to WhatsApp...';

    // Format formatted WhatsApp message
    const formattedMessage = 
      `*Space Station Lahore — Workspace Inquiry*\n\n` +
      `👤 *Full Name:* ${name}\n` +
      `📞 *Phone / WhatsApp:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `🏢 *Interested Plan:* ${planText}\n` +
      `💬 *Message:* ${message}\n\n` +
      `_Sent via Space Station website inquiry form_`;

    const whatsappUrl = `https://wa.me/923104004001?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      btn.innerHTML = 'Redirecting to WhatsApp... ✓';
      btn.style.backgroundColor = '#25D366';
      btn.style.color = '#FFFFFF';

      const successMsg = document.createElement('div');
      successMsg.className = 'badge badge-moonlight';
      successMsg.style.display = 'block';
      successMsg.style.marginTop = '16px';
      successMsg.style.padding = '12px 18px';
      successMsg.style.textAlign = 'center';
      successMsg.innerHTML = 'Redirecting to WhatsApp (+92 310 4004001)... If the chat doesn\'t open automatically, <a href="' + whatsappUrl + '" target="_blank" style="text-decoration:underline;font-weight:700;color:#25D366;">click here</a>.';
      form.appendChild(successMsg);

      // Open WhatsApp in new tab or redirect
      const newWindow = window.open(whatsappUrl, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 5000);
    }, 600);
  });
}

/* --- 6. Dynamic Number Counter / Counting Animation --- */
function initStatCounters() {
  const counterElements = document.querySelectorAll('.stat-counter[data-target]');
  if (!counterElements.length) return;

  const animateElement = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600; // ms
    const isDecimal = String(target).includes('.');
    const startTimestamp = performance.now();

    const updateCount = (currentTimestamp) => {
      const elapsed = currentTimestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Apple-style ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * target;

      if (isDecimal) {
        el.textContent = prefix + currentVal.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(currentVal).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = prefix + (isDecimal ? target.toFixed(1) : target.toLocaleString()) + suffix;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    counterElements.forEach((el) => observer.observe(el));
  } else {
    counterElements.forEach(animateElement);
  }
}

