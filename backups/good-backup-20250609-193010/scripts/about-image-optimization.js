// About Artist Image Optimization Script
// Purpose: Enhance loading performance for the About the Artist section image
// Created: June 8, 2025

(function() {
    'use strict';

    // Function to handle image loading
    function optimizeAboutImage() {
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;

        const portraitFrame = aboutSection.querySelector('.portrait-frame');
        const img = aboutSection.querySelector('.portrait-frame img');
        
        if (!img || !portraitFrame) return;

        // Add loaded class when image is fully loaded
        if (img.complete) {
            img.classList.add('loaded');
            portraitFrame.classList.add('image-loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
                portraitFrame.classList.add('image-loaded');
            });
        }

        // If image fails to load, still remove the shimmer
        img.addEventListener('error', function() {
            portraitFrame.classList.add('image-loaded');
        });
    }

    // Start optimization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeAboutImage);
    } else {
        optimizeAboutImage();
    }

    // Intersection Observer for smarter loading
    // This will start loading the image slightly before it comes into view
    function setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;

        const options = {
            rootMargin: '500px 0px', // Start loading 500px before the element is visible
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('.portrait-frame img');
                    if (img && img.dataset.src && !img.src) {
                        // If using data-src for lazy loading, swap it
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(aboutSection);
    }

    // Initialize intersection observer
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupIntersectionObserver);
    } else {
        setupIntersectionObserver();
    }

})();
