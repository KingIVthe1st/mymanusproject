// Mobile micro-animations and flourishes (no parallax)
document.addEventListener('DOMContentLoaded', function() {
  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Add ripple effect to buttons
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
    
    // Add animated link class to all links
    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach(link => {
      link.classList.add('animated-link');
    });
    
    // Add border animation to cards
    const cards = document.querySelectorAll('.artwork-item, .media-card, .course-card, .collab-card');
    cards.forEach(card => {
      card.classList.add('border-animation');
    });
    
    // Add icon pulse to icons
    const icons = document.querySelectorAll('.fas, .fab, .far');
    icons.forEach(icon => {
      icon.classList.add('icon-pulse');
    });
    
    // Add loaded class to images after they load
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      }
    });
    
    // Add text reveal animation to headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (!heading.classList.contains('text-scramble')) {
        heading.classList.add('text-reveal');
        const text = heading.textContent;
        heading.textContent = '';
        
        text.split(' ').forEach(word => {
          const span = document.createElement('span');
          span.textContent = word + ' ';
          heading.appendChild(span);
        });
      }
    });
    
    // Add subtle hover effects to featured logos
    const logoItems = document.querySelectorAll('.featured-logo-item');
    logoItems.forEach(item => {
      item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 300);
      });
    });
    
    // Add subtle scale effect to portrait frame on tap
    const portraitFrame = document.querySelector('.portrait-frame');
    if (portraitFrame) {
      portraitFrame.addEventListener('touchstart', function() {
        const img = this.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.02)';
          setTimeout(() => {
            img.style.transform = 'scale(1)';
          }, 500);
        }
      });
    }
    
    // Enhance form elements with focus effects
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      });
      
      element.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });
  }
});
