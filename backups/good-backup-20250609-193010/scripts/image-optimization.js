// Image Optimization and Lazy Loading Script
document.addEventListener('DOMContentLoaded', function() {
  // Mark hero image as critical
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    heroImage.setAttribute('data-critical', 'true');
  }
  
  // Convert all non-critical images to lazy loading
  const images = document.querySelectorAll('img:not([data-critical="true"])');
  images.forEach(img => {
    // Skip if already has data-src
    if (img.dataset.src) return;
    
    // Store original src in data-src
    if (img.src) {
      img.dataset.src = img.src;
      // Create a placeholder
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3C/svg%3E';
      img.style.filter = 'blur(5px)';
      img.style.transition = 'filter 0.3s';
    }
  });
  
  // Setup Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            // Create new image to preload
            const tempImg = new Image();
            tempImg.onload = () => {
              img.src = img.dataset.src;
              img.style.filter = 'none';
              img.classList.add('loaded');
              delete img.dataset.src;
            };
            tempImg.src = img.dataset.src;
          }
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.style.filter = 'none';
      delete img.dataset.src;
    });
  }
});