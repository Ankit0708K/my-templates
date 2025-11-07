// Active nav on scroll (simple)
const sections = document.querySelectorAll('section, header.hero');
const navLinks = document.querySelectorAll('.navbar .nav-link');
function onScroll() {
    let currentId = 'home';
    sections.forEach(sec => {
        const top = window.scrollY + 120;
        if (top >= sec.offsetTop && top < sec.offsetTop + sec.offsetHeight) {
            currentId = sec.id || 'home';
        }
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + currentId));
    const navbarEl = document.querySelector('.navbar');
    if (window.scrollY > 8) {
        navbarEl && navbarEl.classList.add('nav-scrolled');
    } else {
        navbarEl && navbarEl.classList.remove('nav-scrolled');
    }
}
document.addEventListener('scroll', onScroll);
window.addEventListener('load', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    // Lite mode: attach reveal classes to common elements
    const toRevealUp = document.querySelectorAll('.hero-card, .glass-card, .price-card, .testimonial');
    const toRevealZoom = document.querySelectorAll('.portfolio-item');
    const toRevealFade = document.querySelectorAll('.section-title, .section-subtitle');

    toRevealUp.forEach((el, idx) => { el.classList.add('reveal-up'); el.style.transitionDelay = (idx % 3) * 80 + 'ms'; });
    toRevealZoom.forEach((el, idx) => { el.classList.add('reveal-zoom'); el.style.transitionDelay = (idx % 3) * 80 + 'ms'; });
    toRevealFade.forEach((el, idx) => { el.classList.add('reveal-fade'); el.style.transitionDelay = (idx % 3) * 80 + 'ms'; });

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    document.querySelectorAll('.reveal-up, .reveal-zoom, .reveal-fade').forEach(el => io.observe(el));

    // Observe new sections by applying reveal classes programmatically
    document.querySelectorAll('#process .glass-card, #craftsmanship .glass-card').forEach((el, idx) => {
        el.classList.add('reveal-up');
        el.style.transitionDelay = (idx % 3) * 80 + 'ms';
        io.observe(el);
    });
    document.querySelectorAll('#process .section-title, #craftsmanship .section-title, #process .section-subtitle, #craftsmanship .section-subtitle').forEach((el, idx) => {
        el.classList.add('reveal-fade');
        el.style.transitionDelay = (idx % 3) * 80 + 'ms';
        io.observe(el);
    });

    // Footer sections reveal
    document.querySelectorAll('.footer-brand, .footer-links, .footer-newsletter').forEach((el, idx) => {
        el.classList.add('reveal-fade');
        el.style.transitionDelay = (idx % 3) * 100 + 'ms';
        io.observe(el);
    });

    onScroll();

    // Scroll to Top Button - Smooth scroll and show/hide
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button on scroll
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Smooth scroll to top
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen to scroll events
    window.addEventListener('scroll', toggleScrollButton);
    toggleScrollButton(); // Check initial state

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items with smooth animation
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 200);
                }
            });
        });
    });
});

