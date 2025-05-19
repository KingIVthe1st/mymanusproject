// Additional iPhone luxury interactions
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add glassmorphism effect to cards
        const cards = document.querySelectorAll('.artwork-item, .course-card, .collab-card, .contact-form');
        cards.forEach(card => {
            card.classList.add('glassmorphism-card');
        });
        
        // Add floating effect to important elements
        const floatingElements = document.querySelectorAll('.portrait-frame, .about-quote, .btn-primary');
        floatingElements.forEach(element => {
            element.classList.add('floating-element');
        });
        
        // Add gradient borders to featured items
        const spotlightItems = document.querySelectorAll('.artwork-item.spotlight');
        spotlightItems.forEach(item => {
            item.classList.add('gradient-border');
        });
        
        // Add shiny effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.classList.add('btn-shiny');
        });
        
        // Add animated underlines to links
        const links = document.querySelectorAll('.navbar-link, .footer-link');
        links.forEach(link => {
            link.classList.add('animated-underline');
        });
        
        // Add glow effect to important elements
        const glowElements = document.querySelectorAll('.btn-primary, .hero-label');
        glowElements.forEach(element => {
            element.classList.add('glow-on-hover');
        });
        
        // Add magnetic button effect
        const magneticButtons = document.querySelectorAll('.btn');
        
        magneticButtons.forEach(button => {
            button.addEventListener('touchmove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 8;
                const deltaY = (y - centerY) / 8;
                
                button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            button.addEventListener('touchend', function() {
                button.style.transform = '';
            });
        });
        
        // Add subtle parallax to sections
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            sections.forEach((section, index) => {
                const speed = 0.05;
                const direction = index % 2 === 0 ? 1 : -1;
                const offset = scrollPosition * speed * direction;
                
                // Only apply parallax if section is in viewport
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    section.style.transform = `translateY(${offset}px)`;
                }
            });
        });
        
        // Add haptic-like feedback (visual only since we can't use actual haptics)
        const touchElements = document.querySelectorAll('.btn, .artwork-item, .navbar-link');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                element.style.transform = '';
            });
        });
        
        // Add scroll-triggered animations
        const animatedElements = document.querySelectorAll('.reveal');
        
        const animateOnScroll = function() {
            animatedElements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        element.classList.add('active');
                    }, index * 100);
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Initial check
        
        // Add smooth scrolling with enhanced easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        // Cubic easing function for smooth acceleration and deceleration
                        const easing = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                        
                        window.scrollTo(0, startPosition + distance * easing);
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    }
                    
                    window.requestAnimationFrame(step);
                }
            });
        });
    }
});
