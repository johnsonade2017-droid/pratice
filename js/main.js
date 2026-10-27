/**
 * PREMAT SMARTWATCH - LANDING PAGE INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Sticky Header on Scroll
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(link => link.classList.remove('active'));
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 4. Interactive Watch Color Picker
  const colorOptions = document.querySelectorAll('.color-option');
  const aboutWatchImg = document.getElementById('aboutWatchImg');
  const modelSpecLabel = document.getElementById('modelSpecLabel');

  const watchVariants = {
    black: {
      src: './assets/images/product-watch-black.jpg',
      alt: 'Premat Smartwatch Midnight Black Edition',
      modelText: 'Model No #240 Blackmart'
    },
    coral: {
      src: './assets/images/hero-watch-coral.jpg',
      alt: 'Premat Smartwatch Sunset Coral Edition',
      modelText: 'Model No #240 Coralmart'
    }
  };

  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.getAttribute('data-color');
      if (!color || !watchVariants[color]) return;

      colorOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      if (aboutWatchImg) {
        aboutWatchImg.style.opacity = '0';
        aboutWatchImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
          aboutWatchImg.src = watchVariants[color].src;
          aboutWatchImg.alt = watchVariants[color].alt;
          if (modelSpecLabel) {
            modelSpecLabel.textContent = watchVariants[color].modelText;
          }
          aboutWatchImg.style.opacity = '1';
          aboutWatchImg.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 6. Interactive Toast Notice for CTAs & Forms
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  const showToast = (message) => {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // Buy buttons click handler
  const buyButtons = document.querySelectorAll('.action-buy');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🎉 Added Premat Smartwatch to your cart!');
    });
  });

  // Newsletter subscription handler
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim() !== '') {
        showToast('📬 Thank you for subscribing for early access!');
        input.value = '';
      }
    });
  }
});
