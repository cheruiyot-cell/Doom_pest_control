// ===== Scroll Progress =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
});

// ===== Mobile Menu =====
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
    mobileToggle.classList.toggle('active', isOpen);
  });
}

// ===== Dark Mode =====
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });
}

// ===== FAQ Accordion (if present on other pages) =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const answer = question.nextElementSibling;
    const isOpen = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-answer').classList.remove('open');
    });
    if (!isOpen) {
      faqItem.classList.add('active');
      answer.classList.add('open');
    }
  });
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Swiper (only if present) =====
if (typeof Swiper !== 'undefined') {
  new Swiper('.testimonial-swiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    effect: 'fade',
    fadeEffect: { crossFade: true }
  });
}

// ===== Pre-fill Service from URL =====
const params = new URLSearchParams(window.location.search);
const service = params.get('service');
const pestSelect = document.getElementById('pest');
if (pestSelect && service) {
  const map = {
    cockroaches: 'Cockroaches',
    rats: 'Rats',
    bedbugs: 'Bedbugs',
    termites: 'Termites',
    mosquitoes: 'Mosquitoes',
    ants: 'Ants / Other'
  };
  if (map[service]) pestSelect.value = map[service];
}

// ===== Booking Form (Sends to WhatsApp) =====
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const estate = document.getElementById('estate').value.trim();
    const pest = document.getElementById('pest').value;
    const area = document.getElementById('area').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !phone || !estate || !pest) {
      alert('Please fill in all required fields.');
      return;
    }

    // Build WhatsApp message
    let waMessage = `Hello DOOM Pest Control!%0A%0A`;
    waMessage += `*Name:* ${encodeURIComponent(name)}%0A`;
    waMessage += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    waMessage += `*Estate:* ${encodeURIComponent(estate)}%0A`;
    waMessage += `*Pest:* ${encodeURIComponent(pest)}%0A`;
    if (area) waMessage += `*Area:* ${encodeURIComponent(area)}%0A`;
    if (date) waMessage += `*Preferred Date:* ${encodeURIComponent(date)}%0A`;
    if (message) waMessage += `*Message:* ${encodeURIComponent(message)}%0A`;

    const waUrl = `https://wa.me/254702555093?text=${waMessage}`;

    // Hide form and show success message
    bookingForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank');
  });
}

// ===== Scroll Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Quote Calculator (Pricing Page) =====
function calculateQuote() {
  const pest = document.getElementById('calc-pest').value;
  const size = document.getElementById('calc-size').value;
  const severity = document.getElementById('calc-severity').value;
  if (!pest) {
    document.getElementById('calc-result').innerHTML = 'Please select a pest type.';
    return;
  }
  const base = parseFloat(pest);
  const total = Math.round(base * size * severity);
  document.getElementById('calc-result').innerHTML = 'Estimated: KSh ' + total.toLocaleString() + '<br><small>Final quote after free inspection.</small>';
}

// ===== Calendly Loading Indicator =====
const calendlyWidget = document.querySelector('.calendly-inline-widget');
const calendlyLoading = document.getElementById('calendly-loading');

if (calendlyWidget && calendlyLoading) {
  // Use MutationObserver to detect when the iframe is injected
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        // Check if an iframe exists inside the widget
        if (calendlyWidget.querySelector('iframe')) {
          calendlyLoading.style.display = 'none';
          observer.disconnect();
        }
      }
    });
  });

  observer.observe(calendlyWidget, { childList: true, subtree: true });

  // Fallback: hide loading after 10 seconds even if iframe is not detected
  setTimeout(() => {
    if (!calendlyWidget.querySelector('iframe')) {
      calendlyLoading.innerHTML = '<p>The booking calendar could not load. Please use the WhatsApp link below.</p>';
    }
  }, 10000);
}