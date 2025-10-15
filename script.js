document.addEventListener('DOMContentLoaded', () => {
    console.log("NextOS site is running!");

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Scroll-triggered Fade-in Animation ---
    const sections = document.querySelectorAll('.content-section');

    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            // Animation for cards and sections
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    // Use a higher threshold (0.1) for mobile to trigger faster
    const thresholdValue = window.innerWidth <= 768 ? 0.1 : 0.2; 

    const sectionObserver = new IntersectionObserver(fadeInOnScroll, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: thresholdValue 
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Dynamic Active Nav Link (Optional) ---
    const navItems = document.querySelectorAll('nav .nav-links li a');
    const sectionElements = document.querySelectorAll('.content-section');

    window.addEventListener('scroll', () => {
        let current = '';
        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            if (window.pageYOffset >= sectionTop - 50) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
