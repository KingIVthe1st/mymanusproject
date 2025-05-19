/**
 * Main JavaScript file for Amira Rahim's premium landing page
 * Designed with billion-dollar quality and luxury aesthetics
 */

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${scrollPercentage}%`;
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.navbar-mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="text-yellow-500">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize Text Scramble Effect
document.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('.text-scramble');
    
    textElements.forEach(el => {
        const originalText = el.innerText;
        const fx = new TextScramble(el);
        
        const onIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fx.setText(originalText);
                    observer.unobserve(el);
                }
            });
        };
        
        const observer = new IntersectionObserver(onIntersection, {
            threshold: 0.5
        });
        
        observer.observe(el);
    });
});

// Reveal Animation on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Spotlight Effect
document.querySelectorAll('.spotlight').forEach(element => {
    element.addEventListener('mousemove', e => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        element.style.setProperty('--x', `${x}%`);
        element.style.setProperty('--y', `${y}%`);
    });
});

// Magnetic Button Effect
document.querySelectorAll('.magnetic-btn').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Animated Counters
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const frameDuration = duration / 100;
    
    const animate = () => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current < target) {
            setTimeout(animate, frameDuration);
        } else {
            element.textContent = target;
        }
    };
    
    animate();
};

const initCounters = () => {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
};

window.addEventListener('load', initCounters);

// Form Validation
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });
        
        if (valid) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 3000);
            }, 2000);
        }
    });
}

// Featured Badge Animation
document.querySelectorAll('.featured-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'translateY(-10px)';
    });
    
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'translateY(0)';
    });
});

// Initialize AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// Artwork Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const artworkItems = document.querySelectorAll('.artwork-item');

if (filterButtons.length > 0 && artworkItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter artwork items
            artworkItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Enhanced Lightbox Gallery with Glassmorphism
function initLightbox() {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-content">
                <img id="lightbox-img" src="" alt="">
                <div id="lightbox-caption" class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    // Add glassmorphic container to all artwork images
    const artworkImages = document.querySelectorAll('.artwork-item img');
    artworkImages.forEach(img => {
        // Skip if already wrapped
        if (img.closest('.glass-image-container')) return;
        
        const container = document.createElement('div');
        container.className = 'glass-image-container';
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        
        // Add click handler for lightbox
        container.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(img.src, img.alt);
        });
    });
    
    // Add glassmorphic container to other images
    const galleryImages = document.querySelectorAll('img:not(.artwork-item img):not(.logo-image):not([src*="logo"])');
    galleryImages.forEach(img => {
        // Skip if already wrapped or in lightbox
        if (img.closest('.glass-image-container') || img.id === 'lightbox-img') return;
        
        const container = document.createElement('div');
        container.className = 'glass-image-container';
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        
        // Add click handler for lightbox
        container.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(img.src, img.alt);
        });
    });
    
    // Lightbox elements
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Open lightbox function
    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCaption.textContent = alt;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
        document.documentElement.classList.add('lightbox-open');
        
        // Trigger reflow
        void lightbox.offsetWidth;
        lightbox.classList.add('show');
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.documentElement.classList.remove('lightbox-open');
        document.removeEventListener('keydown', handleKeyDown);
        
        // Wait for transition to complete before removing src
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.alt = '';
            lightboxCaption.textContent = '';
        }, 300);
    }
    
    // Keyboard navigation
    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            // Navigate to next image
            navigate(1);
        } else if (e.key === 'ArrowLeft') {
            // Navigate to previous image
            navigate(-1);
        }
    }
    
    // Navigation between images
    function navigate(direction) {
        const images = Array.from(document.querySelectorAll('.glass-image-container img'));
        const currentIndex = images.findIndex(img => img.src === lightboxImg.src);
        
        if (currentIndex !== -1) {
            let newIndex = currentIndex + direction;
            
            // Loop around
            if (newIndex < 0) newIndex = images.length - 1;
            if (newIndex >= images.length) newIndex = 0;
            
            // Fade out current image
            lightboxImg.style.opacity = '0';
            
            // Load new image after fade out
            setTimeout(() => {
                const newImg = images[newIndex];
                lightboxImg.src = newImg.src;
                lightboxImg.alt = newImg.alt;
                lightboxCaption.textContent = newImg.alt;
                
                // Fade in new image
                setTimeout(() => {
                    lightboxImg.style.opacity = '1';
                }, 50);
            }, 200);
        }
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Prevent lightbox from closing when clicking on the image or caption
    lightbox.querySelector('.lightbox-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

window.addEventListener('load', initLightbox);

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// 3D Book Effect
const bookElements = document.querySelectorAll('.book-3d');

bookElements.forEach(book => {
    const bookContainer = book.closest('.book-display');
    
    if (bookContainer) {
        bookContainer.addEventListener('mousemove', e => {
            const rect = bookContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
            
            book.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
        
        bookContainer.addEventListener('mouseleave', () => {
            book.style.transform = 'perspective(1000px) rotateY(10deg) rotateX(0deg)';
        });
    }
});
