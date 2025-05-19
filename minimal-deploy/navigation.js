document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuToggle = document.querySelector('.navbar-mobile-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navLinks = document.querySelectorAll('.navbar-link, .mobile-menu-link');
    const html = document.documentElement;
    
    // Check if mobile menu is open
    let isMenuOpen = false;
    
    // Scroll effect for navbar
    let lastScroll = 0;
    const navbarHeight = navbar.offsetHeight;
    
    // Handle scroll events with throttling
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 10) {
            navbar.classList.add('scrolled');
            
            // Only hide/show navbar if menu is closed
            if (!isMenuOpen) {
                if (currentScroll > lastScroll && currentScroll > navbarHeight) {
                    // Scrolling down
                    navbar.style.transform = 'translate(-50%, -100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translate(-50%, 0)';
                }
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translate(-50%, 0)';
        }
        
        lastScroll = currentScroll;
    }
    
    // Toggle mobile menu with animation
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle aria-expanded for accessibility
        mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
        
        // Toggle menu visibility
        if (isMenuOpen) {
            // Show menu
            mobileMenu.style.display = 'flex';
            html.style.overflow = 'hidden';
            
            // Trigger reflow
            void mobileMenu.offsetWidth;
            
            // Add active class for animation
            mobileMenu.classList.add('active');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Hide menu with animation
            mobileMenu.classList.remove('active');
            
            // Re-enable body scroll after animation
            setTimeout(() => {
                if (!isMenuOpen) { // Check still closed after animation
                    mobileMenu.style.display = 'none';
                    html.style.overflow = '';
                    document.body.style.overflow = '';
                }
            }, 300); // Match this with your CSS transition duration
        }
    }
    
    // Smooth scroll for anchor links
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // If it's not an anchor link, just follow the link
        if (targetId === '#' || !targetId.startsWith('#')) {
            window.location.href = targetId;
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (isMenuOpen) {
                toggleMobileMenu();
            }
            
            // Calculate the target position with offset
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + 20);
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without adding to history
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    }
    
    // Close menu when clicking on a nav link
    function closeMenuOnNavClick() {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Mobile menu close button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Add smooth scroll to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            smoothScroll.call(link, e);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Close menu on window resize if it becomes desktop
    function handleResize() {
        if (window.innerWidth >= 1024 && isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initialize
    handleScroll();
    
    // Initialize mobile menu state
    if (window.innerWidth < 1024) {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = '';
    }
});
