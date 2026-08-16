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
        mainNav.classList.toggle('open');
        mobileToggle.classList.toggle('active');
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

// ===== FAQ Accordion =====
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

// ===== GLightbox & Swiper (ensure libraries are loaded) =====
if (typeof GLightbox !== 'undefined') GLightbox({ selector: '[data-gallery]', touchNavigation: true, loop: true });
if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
        loop: true, autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        effect: 'fade', fadeEffect: { crossFade: true }
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

        if (!name || !phone || !estate || !pest) {
            alert('Please fill in all required fields.');
            return;
        }

        // Build WhatsApp message
        const message = `Hello DOOM Pest Control!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Estate:* ${encodeURIComponent(estate)}%0A*Pest:* ${encodeURIComponent(pest)}`;
        const waUrl = `https://wa.me/254702555093?text=${message}`;

        // Hide form, show success, then open WhatsApp
        bookingForm.style.display = 'none';
        formSuccess.style.display = 'block';
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