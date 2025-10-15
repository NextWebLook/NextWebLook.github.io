document.addEventListener('DOMContentLoaded', () => {
    console.log("NEXTWEBLOOK site is running!");

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('header').offsetHeight; // Height of fixed header
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little extra padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Scroll-triggered Fade-in Animation ---
    const sections = document.querySelectorAll('.content-section');

    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const sectionObserver = new IntersectionObserver(fadeInOnScroll, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Dynamic Active Nav Link (Optional) ---
    // This highlights the current section in the nav bar
    const navItems = document.querySelectorAll('nav .nav-links li a');
    const sectionElements = document.querySelectorAll('.content-section');

    window.addEventListener('scroll', () => {
        let current = '';
        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            if (pageYOffset >= sectionTop - 50) { // -50 for better trigger
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
