// Mobile enhancements for Amira Rahim's premium landing page
// Adds luxury interactions and animations specifically for mobile devices

document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add smooth parallax scrolling effect
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Parallax for hero section
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const heroImage = heroSection.querySelector('.portrait-frame');
                if (heroImage) {
                    heroImage.style.transform = `translateY(${scrollPosition * 0.05}px) scale(0.95)`;
                }
            }
            
            // Parallax for decorative circles
            const circles = document.querySelectorAll('.decorative-circle');
            circles.forEach((circle, index) => {
                const direction = index % 2 === 0 ? 1 : -1;
                const speed = 0.03 + (index * 0.01);
                circle.style.transform = `translate(${scrollPosition * speed * direction}px, ${scrollPosition * speed}px)`;
            });
        });
        
        // Add touch ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add scroll indicator to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.classList.add('scroll-indicator');
            scrollIndicator.innerHTML = `
                <span class="scroll-indicator-text">Scroll</span>
                <i class="fas fa-chevron-down scroll-indicator-icon"></i>
            `;
            hero.appendChild(scrollIndicator);
        }
        
        // Enhance artwork cards with 3D tilt effect
        const artworkItems = document.querySelectorAll('.artwork-item');
        artworkItems.forEach(item => {
            item.classList.add('card-3d-effect');
            
            item.addEventListener('touchmove', function(e) {
                const rect = item.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            item.addEventListener('touchend', function() {
                item.style.transform = '';
            });
        });
        
        // Add smooth reveal animations for sections
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = function() {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
        
        // Add spotlight effect to artwork items
        const spotlightItems = document.querySelectorAll('.spotlight');
        spotlightItems.forEach((item, index) => {
            // Stagger the animation
            const delay = index * 0.5;
            item.style.animationDelay = `${delay}s`;
        });
    }
});
