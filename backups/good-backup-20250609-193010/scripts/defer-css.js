// Defer non-critical CSS loading
(function() {
  // List of non-critical CSS files to defer
  const nonCriticalStyles = [
    'styles/mobile-flourishes.css',
    'styles/circle-animation.css',
    'styles/premium-effects-enhanced.css',
    'styles/luxury-typography.css',
    'styles/table-animations.css',
    'styles/floating-particles-fix.css',
    'styles/footer-enhancement.css'
  ];

  // Function to load CSS
  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() { 
      this.media = 'all';
      this.onload = null;
    };
    document.head.appendChild(link);
  }

  // Load non-critical CSS after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        nonCriticalStyles.forEach(loadCSS);
      }, 100);
    });
  } else {
    nonCriticalStyles.forEach(loadCSS);
  }
})();