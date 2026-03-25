document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    // Initial check for all fade-in elements
    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });

    // Accordion Logic for Syllabus Page
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    accordionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent default just in case
            e.preventDefault();

            // Toggle active state
            this.classList.toggle('active');
            
            // Rotate Icon
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
            
            // Toggle Content
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                // Close
                content.style.maxHeight = null;
            } else {
                // Open
                // If this is a nested accordion, we also need to adjust the parent's max-height to fit the newly opened child
                content.style.maxHeight = content.scrollHeight + "px";
                
                const parentAccordionContent = this.closest('.accordion-content');
                // Check if this content is directly inside another accordion content
                if (parentAccordionContent && parentAccordionContent !== content) {
                     parentAccordionContent.style.maxHeight = (parentAccordionContent.scrollHeight + content.scrollHeight) + "px";
                }
            }
        });
    });

    // Smooth scroll for anchor links (especially useful for Departments -> Syllabus mapping)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // If it's an accordion that is being linked to, open it!
                const accordionBtn = targetElement.querySelector('.accordion-btn');
                if(accordionBtn && !accordionBtn.classList.contains('active')) {
                    setTimeout(() => {
                        accordionBtn.click();
                    }, 500); // give it time to scroll first
                }
            }
        });
    });
});
