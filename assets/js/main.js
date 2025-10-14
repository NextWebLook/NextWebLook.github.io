// Smooth Scrolling for Internal Links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll-to-Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '&uarr;';
    scrollToTopBtn.title = 'Back to Top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                scrollToTopBtn.style.display = 'none';
            }, 300);
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});    // 3. Scroll Progress Bar
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
