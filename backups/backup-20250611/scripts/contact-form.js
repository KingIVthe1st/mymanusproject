        const response = await fetch(formAction, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          return true;
        }
      } catch (error) {
        console.log('ContactForm: Form action submission failed, trying alternatives');
      }
    }
    
    // Method 2: Netlify Forms (if available)
    if (form.element.hasAttribute('netlify') || form.element.hasAttribute('data-netlify')) {
      try {
        const netlifyData = new FormData();
        Object.keys(formData).forEach(key => {
          netlifyData.append(key, formData[key]);
        });
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(netlifyData).toString()
        });
        
        if (response.ok) {
          return true;
        }
      } catch (error) {
        console.log('ContactForm: Netlify submission failed, trying alternatives');
      }
    }
    
    // Method 3: EmailJS (if configured)
    if (window.emailjs) {
      try {
        await window.emailjs.send('default_service', 'default_template', formData);
        return true;
      } catch (error) {
        console.log('ContactForm: EmailJS submission failed, trying alternatives');
      }
    }
    
    // Method 4: Store for offline sync
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        // Store in IndexedDB for sync when online
        await this.storeForOfflineSync(formData);
        
        // Register for background sync
        const registration = await navigator.serviceWorker.ready;
        if ('sync' in registration) {
          await registration.sync.register('contact-form-sync');
        }
        
        return true; // Consider offline storage as success
      } catch (error) {
        console.log('ContactForm: Offline storage failed');
      }
    }
    
    return false;
  }
  
  async storeForOfflineSync(formData) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ContactFormDB', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['submissions'], 'readwrite');
        const store = transaction.objectStore('submissions');
        
        const submission = {
          id: Date.now(),
          data: formData,
          timestamp: new Date().toISOString(),
          synced: false
        };
        
        store.add(submission);
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const store = db.createObjectStore('submissions', { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp');
        store.createIndex('synced', 'synced');
      };
    });
  }
  
  showSubmitState(form, state) {
    const button = form.submitButton;
    if (!button) return;
    
    const states = {
      default: {
        text: 'Send Message',
        icon: 'fas fa-paper-plane',
        disabled: false,
        className: 'btn-primary'
      },
      submitting: {
        text: 'Sending...',
        icon: 'fas fa-spinner fa-spin',
        disabled: true,
        className: 'btn-loading'
      },
      success: {
        text: 'Sent!',
        icon: 'fas fa-check',
        disabled: true,
        className: 'btn-success'
      },
      error: {
        text: 'Try Again',
        icon: 'fas fa-exclamation-triangle',
        disabled: false,
        className: 'btn-error'
      }
    };
    
    const config = states[state] || states.default;
    
    // Update button content
    button.innerHTML = `
      <i class="${config.icon}"></i>
      <span>${config.text}</span>
    `;
    
    // Update button state
    button.disabled = config.disabled;
    
    // Update button classes
    button.className = button.className.replace(/btn-(primary|loading|success|error)/g, '');
    button.classList.add(config.className);
  }
  
  showFormMessage(form, message, type) {
    let messageElement = form.element.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      form.element.appendChild(messageElement);
    }
    
    // Style the message
    const styles = {
      success: {
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        color: '#065f46'
      },
      error: {
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#7f1d1d'
      }
    };
    
    const style = styles[type] || styles.success;
    
    messageElement.style.cssText = `
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      font-size: 0.875rem;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      background: ${style.background};
      border: ${style.border};
      color: ${style.color};
    `;
    
    messageElement.textContent = message;
    
    // Animate in
    setTimeout(() => {
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentElement) {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (messageElement.parentElement) {
            messageElement.remove();
          }
        }, 300);
      }
    }, 5000);
  }
  
  resetForm(form) {
    form.fields.forEach(field => {
      field.element.value = '';
      field.element.style.borderColor = '';
      field.element.style.boxShadow = '';
      field.isValid = false;
      
      if (field.errorElement) {
        field.errorElement.style.opacity = '0';
        field.errorElement.style.display = 'none';
      }
    });
    
    form.isValid = false;
    this.updateFormValidity();
  }
  
  trackFormSubmission(formData, status) {
    // Google Analytics tracking
    if (typeof gtag === 'function') {
      gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: status,
        custom_map: {
          'custom_parameter_1': 'form_type'
        }
      });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq === 'function') {
      fbq('track', 'Contact', {
        status: status,
        form_type: 'contact_form'
      });
    }
    
    // Custom analytics
    if (window.analytics) {
      window.analytics.track('Form Submitted', {
        form_type: 'contact',
        status: status,
        fields: Object.keys(formData).filter(key => !['timestamp', 'userAgent', 'referrer', 'page'].includes(key))
      });
    }
    
    console.log('ContactForm: Form submission tracked', { status, formData });
  }
}

// Auto-submit prevention for rapid submissions
class SubmissionThrottler {
  constructor(cooldownMs = 5000) {
    this.cooldownMs = cooldownMs;
    this.lastSubmission = 0;
  }
  
  canSubmit() {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmission;
    
    if (timeSinceLastSubmission < this.cooldownMs) {
      return false;
    }
    
    this.lastSubmission = now;
    return true;
  }
  
  getRemainingCooldown() {
    const now = Date.now();
    const elapsed = now - this.lastSubmission;
    return Math.max(0, this.cooldownMs - elapsed);
  }
}

// Honeypot spam protection
class SpamProtection {
  static addHoneypot(form) {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.cssText = `
      position: absolute;
      left: -9999px;
      top: -9999px;
      opacity: 0;
      pointer-events: none;
      tab-index: -1;
    `;
    honeypot.setAttribute('autocomplete', 'off');
    honeypot.setAttribute('aria-hidden', 'true');
    
    form.appendChild(honeypot);
    return honeypot;
  }
  
  static isSpam(formData) {
    // Check honeypot
    if (formData.website && formData.website.trim() !== '') {
      console.warn('ContactForm: Spam detected via honeypot');
      return true;
    }
    
    // Check for common spam patterns
    const content = Object.values(formData).join(' ').toLowerCase();
    const spamWords = ['viagra', 'cialis', 'casino', 'loan', 'bitcoin', 'crypto'];
    
    const spamScore = spamWords.reduce((score, word) => {
      return score + (content.includes(word) ? 1 : 0);
    }, 0);
    
    if (spamScore > 0) {
      console.warn('ContactForm: Spam detected via content analysis');
      return true;
    }
    
    return false;
  }
}

// Initialize contact form when module is loaded
const contactForm = new ContactFormManager();
const submissionThrottler = new SubmissionThrottler();

// Add honeypot to all forms
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    SpamProtection.addHoneypot(form);
  });
});

// Export for external use
window.ContactFormManager = ContactFormManager;
window.SubmissionThrottler = SubmissionThrottler;
window.SpamProtection = SpamProtection;
window.contactForm = contactForm;

console.log('Contact Form module loaded successfully');
