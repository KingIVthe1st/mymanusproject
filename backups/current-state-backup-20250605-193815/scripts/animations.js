// Add animation for social media cards
document.querySelectorAll('.bg-green-50, .bg-pink-50, .bg-blue-50, .bg-red-50').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    card.style.transition = 'all 0.3s ease';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    card.style.transition = 'all 0.3s ease';
  });
});

// Add animation for collaboration cards
document.querySelectorAll('.overflow-hidden.rounded-lg.shadow-lg').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const image = card.querySelector('.h-48');
    if (image) {
      image.style.transform = 'scale(1.05)';
      image.style.transition = 'transform 0.5s ease';
    }
    
    const button = card.querySelector('a.inline-flex');
    if (button) {
      const arrow = button.querySelector('.fa-arrow-right');
      if (arrow) {
        arrow.style.transform = 'translateX(5px)';
        arrow.style.transition = 'transform 0.3s ease';
      }
    }
  });
  
  card.addEventListener('mouseleave', () => {
    const image = card.querySelector('.h-48');
    if (image) {
      image.style.transform = 'scale(1)';
      image.style.transition = 'transform 0.5s ease';
    }
    
    const button = card.querySelector('a.inline-flex');
    if (button) {
      const arrow = button.querySelector('.fa-arrow-right');
      if (arrow) {
        arrow.style.transform = 'translateX(0)';
        arrow.style.transition = 'transform 0.3s ease';
      }
    }
  });
});

// Add animation for the "Let's Create Together" badge
const createBadge = document.querySelector('.animate-spin-slow');
if (createBadge) {
  // Add slow spinning animation
  createBadge.style.animation = 'spin 20s linear infinite';
  
  // Add hover effect to pause animation
  createBadge.addEventListener('mouseenter', () => {
    createBadge.style.animationPlayState = 'paused';
    createBadge.style.transform = 'scale(1.1)';
    createBadge.style.transition = 'transform 0.3s ease';
  });
  
  createBadge.addEventListener('mouseleave', () => {
    createBadge.style.animationPlayState = 'running';
    createBadge.style.transform = 'scale(1)';
    createBadge.style.transition = 'transform 0.3s ease';
  });
}

// Add animation for newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  const input = newsletterForm.querySelector('input[type="email"]');
  const button = newsletterForm.querySelector('button[type="submit"]');
  
  if (input) {
    input.addEventListener('focus', () => {
      input.style.transform = 'translateY(-2px)';
      input.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      input.style.transition = 'all 0.3s ease';
    });
    
    input.addEventListener('blur', () => {
      input.style.transform = 'translateY(0)';
      input.style.boxShadow = 'none';
      input.style.transition = 'all 0.3s ease';
    });
  }
  
  if (button) {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      button.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
      button.style.transition = 'all 0.3s ease';
    });
  }
}

// Add subtle parallax effect to decorative elements
window.addEventListener('scroll', () => {
  const decorativeElements = document.querySelectorAll('.decorative-circle');
  
  decorativeElements.forEach((element, index) => {
    const speed = 0.05 * (index + 1);
    const yPos = window.scrollY * speed;
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Add animation for section labels
document.querySelectorAll('.inline-block.px-4.py-1.rounded-full').forEach(label => {
  label.style.opacity = '0';
  label.style.transform = 'translateY(20px)';
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        label.style.opacity = '1';
        label.style.transform = 'translateY(0)';
        label.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.unobserve(label);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(label);
});

// Add animation for checkmarks in lists
document.querySelectorAll('.fa-check-circle, .fa-check').forEach(check => {
  check.style.opacity = '0';
  check.style.transform = 'scale(0)';
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          check.style.opacity = '1';
          check.style.transform = 'scale(1)';
          check.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, Math.random() * 500); // Stagger the animations
        observer.unobserve(check);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(check);
});

// Add keyframe animation for CSS
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.animate-pulse-slow {
  animation: pulse 3s ease-in-out infinite;
}
`;

document.head.appendChild(style);

// Ensure mobile responsiveness for animations
const checkMobile = () => {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Adjust animations for mobile
    document.querySelectorAll('.animate-spin-slow').forEach(element => {
      element.style.animationDuration = '30s'; // Slower on mobile
    });
    
    // Reduce motion for better performance on mobile
    document.querySelectorAll('.parallax').forEach(element => {
      element.style.transform = 'none';
    });
  }
};

window.addEventListener('resize', checkMobile);
checkMobile(); // Run on initial load
