/**
 * Mishika Solar Sphere - Optimized Frontend Script (Desktop & Mobile-First)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Mobile Menu & Drawer Controller with 100% Solid Opaque Styling
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navbar = document.getElementById('navbar');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('hidden');
    if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
    if (menuIconOpen) menuIconOpen.classList.add('hidden');
    if (menuIconClose) menuIconClose.classList.remove('hidden');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    if (navbar) navbar.classList.add('menu-open');
    document.body.style.overflow = 'hidden'; // Lock background scroll on mobile menu open
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
    if (menuIconOpen) menuIconOpen.classList.remove('hidden');
    if (menuIconClose) menuIconClose.classList.add('hidden');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (navbar) navbar.classList.remove('menu-open');
    document.body.style.overflow = ''; // Unlock background scroll
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });

    // Close on clicking outside menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on desktop resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  // =========================================================================
  // 2. Interactive Solar Savings & Subsidy Calculator with Mobile Presets
  // =========================================================================
  const billRange = document.getElementById('bill-range');
  const billDisplay = document.getElementById('bill-display');
  const calcKw = document.getElementById('calc-kw');
  const calcSavings = document.getElementById('calc-monthly-savings');
  const calcSubsidy = document.getElementById('calc-subsidy');
  const calcSubsidyLabel = document.getElementById('calc-subsidy-label');
  const calcSubsidySubtitle = document.getElementById('calc-subsidy-subtitle');
  const calcPayback = document.getElementById('calc-payback');
  const propertyBtns = document.querySelectorAll('.property-toggle-btn');
  const presetBtns = document.querySelectorAll('.calc-preset-btn');

  let isResidential = true;

  // Property type toggles (Residential vs Commercial)
  propertyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      propertyBtns.forEach(b => {
        b.classList.remove('active', 'border-2', 'border-energy-green', 'bg-energy-green/5', 'font-bold', 'text-solar-navy');
        b.classList.add('border', 'border-slate-200', 'font-medium', 'text-slate-600');
      });
      btn.classList.add('active', 'border-2', 'border-energy-green', 'bg-energy-green/5', 'font-bold', 'text-solar-navy');
      btn.classList.remove('border', 'border-slate-200', 'font-medium', 'text-slate-600');
      isResidential = btn.textContent.includes('Residential');
      updateCalculator();
    });
  });

  // Quick Preset Pills Click Listeners (Fast Mobile Selection)
  presetBtns.forEach(pBtn => {
    pBtn.addEventListener('click', () => {
      const val = parseInt(pBtn.getAttribute('data-value'), 10);
      if (billRange && !isNaN(val)) {
        billRange.value = val;
        updateCalculator();
      }
    });
  });

  function updatePresetButtons(currentBill) {
    presetBtns.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      if (val === currentBill) {
        btn.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-700');
        btn.classList.add('border-2', 'border-energy-green', 'bg-energy-green/10', 'text-energy-green', 'font-bold');
      } else {
        btn.classList.remove('border-2', 'border-energy-green', 'bg-energy-green/10', 'text-energy-green', 'font-bold');
        btn.classList.add('border', 'border-slate-200', 'bg-slate-50', 'text-slate-700');
      }
    });
  }

  function updateCalculator() {
    if (!billRange) return;
    const bill = parseInt(billRange.value, 10);
    if (billDisplay) {
      billDisplay.textContent = `₹ ${bill.toLocaleString('en-IN')} / month`;
    }

    let kw = 2.0;
    let savings = Math.round(bill * 0.88);
    let subsidy = 60000;
    let payback = 3.2;

    if (bill <= 2000) {
      kw = 2.0;
      subsidy = isResidential ? 60000 : 0;
      payback = 3.0;
    } else if (bill <= 4000) {
      kw = 3.0;
      subsidy = isResidential ? 78000 : 0;
      payback = 3.2;
    } else if (bill <= 7000) {
      kw = 5.0;
      subsidy = isResidential ? 78000 : 0;
      payback = 3.4;
    } else if (bill <= 11000) {
      kw = 8.0;
      subsidy = isResidential ? 78000 : 0;
      payback = 3.5;
    } else {
      kw = 10.0;
      subsidy = isResidential ? 78000 : 0;
      payback = 3.7;
    }

    if (calcKw) calcKw.textContent = `${kw.toFixed(1)} kW`;
    if (calcSavings) calcSavings.textContent = `₹ ${savings.toLocaleString('en-IN')}`;

    if (calcSubsidy) {
      if (isResidential) {
        if (calcSubsidyLabel) calcSubsidyLabel.textContent = 'Govt. Direct Subsidy';
        calcSubsidy.textContent = `₹ ${subsidy.toLocaleString('en-IN')}`;
        if (calcSubsidySubtitle) calcSubsidySubtitle.textContent = 'PM Surya Ghar Yojana';
      } else {
        if (calcSubsidyLabel) calcSubsidyLabel.textContent = 'Commercial Benefit';
        calcSubsidy.textContent = '40% Depreciation';
        if (calcSubsidySubtitle) calcSubsidySubtitle.textContent = 'Sec 32 Tax Write-Off';
      }
    }

    if (calcPayback) calcPayback.textContent = `${payback} Years`;
    updateSliderFill();
    updatePresetButtons(bill);
  }

  function updateSliderFill() {
    if (!billRange) return;
    const min = parseFloat(billRange.min) || 1000;
    const max = parseFloat(billRange.max) || 15000;
    const val = parseFloat(billRange.value) || 3500;
    const percentage = ((val - min) / (max - min)) * 100;
    billRange.style.background = `linear-gradient(to right, #3E7D20 0%, #3E7D20 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
  }

  if (billRange) {
    billRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // =========================================================================
  // 3. Hardware-Accelerated Video Stream & Smooth Fallback Controller
  // =========================================================================
  const heroVideo = document.getElementById('hero-video');
  const heroFallback = document.getElementById('hero-fallback-img');

  if (heroVideo) {
    // Guarantee mute and inline properties for mobile autoplay policies
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks autoplay, poster fallback remains seamlessly visible
        });
      }
    }

    // Performance & Mobile Battery: Pause video when scrolled past hero
    if ('IntersectionObserver' in window && heroVideo.parentElement) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !document.hidden && !prefersReducedMotion) {
            heroVideo.play().catch(() => {});
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.05 });
      videoObserver.observe(heroVideo.parentElement);
    }

    // Battery: Pause video when tab is hidden/minimized
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        heroVideo.pause();
      } else if (!prefersReducedMotion && heroVideo.getBoundingClientRect().bottom > 0) {
        heroVideo.play().catch(() => {});
      }
    });
  }

  // =========================================================================
  // 4. FAQ Accordion with Visual Active State & Smooth Height
  // =========================================================================
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const card = toggle.closest('.faq-card');
      const isHidden = content.classList.contains('hidden');

      // Close all other open accordion items
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));
      document.querySelectorAll('.faq-card').forEach(cd => {
        cd.classList.remove('border-2', 'border-energy-green/40', 'shadow-xs');
        cd.classList.add('border', 'border-slate-200');
        const btn = cd.querySelector('.faq-toggle');
        if (btn) btn.classList.remove('bg-solar-bg/40');
      });

      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        if (card) {
          card.classList.add('border-2', 'border-energy-green/40', 'shadow-xs');
          card.classList.remove('border', 'border-slate-200');
        }
        toggle.classList.add('bg-solar-bg/40');
      }
    });
  });

  // =========================================================================
  // 5. Quote Request Form Handling with Instant WhatsApp Confirmation
  // =========================================================================
  const quoteForm = document.getElementById('quote-form');
  const successMsg = document.getElementById('form-success-msg');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(quoteForm);
      const name = formData.get('name') || 'Customer';
      const phone = formData.get('phone') || '';
      const service = formData.get('serviceType') || 'Rooftop Solar';
      const bill = formData.get('billEstimate') || '₹3,000 - ₹6,000';
      const address = formData.get('address') || 'Sikar';

      if (successMsg) {
        successMsg.classList.remove('hidden');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Direct WhatsApp text composition
      const whatsappText = `Hello Mishika Solar Sphere, my name is ${encodeURIComponent(name)}. I am requesting a quote for ${encodeURIComponent(service)} in ${encodeURIComponent(address)}. My average bill is ${encodeURIComponent(bill)}. Please contact me at ${phone}.`;
      
      setTimeout(() => {
        const proceed = confirm(`Thank you, ${name}! Would you like to open WhatsApp to chat directly with our Sikar engineer?`);
        if (proceed) {
          window.open(`https://wa.me/918824601376?text=${whatsappText}`, '_blank');
        }
      }, 600);

      quoteForm.reset();
    });
  }

  // =========================================================================
  // 6. Transparent-to-Glass Navbar Controller with Accurate Mobile Scrollspy
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  const trackedSectionIds = ['home', 'benefits', 'services', 'calculator', 'warranty', 'testimonials', 'faq', 'contact'];
  const trackedSections = trackedSectionIds
    .map(id => document.getElementById(id))
    .filter(el => el !== null);

  function handleNavbarScroll() {
    const scrollY = window.scrollY;

    // 1. Transparent vs Frosted Glass transition
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.remove('nav-transparent');
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
        navbar.classList.add('nav-transparent');
      }
    }

    // 2. Real-time Scrollspy Active Section Detection with adaptive mobile header offset
    const isMobile = window.innerWidth < 640;
    const headerOffset = isMobile ? 80 : 120;
    let activeId = 'home';

    for (let i = 0; i < trackedSections.length; i++) {
      const section = trackedSections[i];
      const top = section.offsetTop - headerOffset;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        activeId = section.getAttribute('id');
        break;
      }
    }

    // If scrolled near bottom of page, highlight contact
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 90) {
      activeId = 'contact';
    }

    // Update Desktop Nav Active Link
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Mobile Drawer Links
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('bg-energy-green/10', 'text-energy-green-dark', 'font-bold');
      } else {
        link.classList.remove('bg-energy-green/10', 'text-energy-green-dark', 'font-bold');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  window.addEventListener('resize', handleNavbarScroll, { passive: true });
  handleNavbarScroll();
});
