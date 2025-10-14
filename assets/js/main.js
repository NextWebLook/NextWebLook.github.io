document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------
    // 1. Initialize AOS (Animate on Scroll)
    // ----------------------------------
    AOS.init({
        duration: 800,       // Duration of the animation (in ms)
        easing: 'ease-out-back', // Easing function
        once: true,          // Animation only happens once
        offset: 150          // Offset (in px) from the original trigger point
    });

    // ----------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-open');
            navMenu.setAttribute('aria-hidden', isExpanded);
        });

        // Close menu when a link is clicked (for better mobile experience)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-open');
                navMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // ----------------------------------
    // 3. Scroll Progress Bar
    // ----------------------------------
    const progressBar = document.getElementById('wenprogressbar');
    const snapContainer = document.querySelector('.snap-container');

    if (progressBar && snapContainer) {
        snapContainer.addEventListener('scroll', () => {
            // Calculate scroll percentage within the snap-container
            const scrollTop = snapContainer.scrollTop;
            const scrollHeight = snapContainer.scrollHeight - snapContainer.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            
            // Set the width of the progress bar
            progressBar.style.width = scrolled + '%';
        });
    }
});
