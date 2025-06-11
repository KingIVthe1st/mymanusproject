/**
 * Complete Mobile Menu Replacement
 * This script completely rebuilds and replaces the mobile menu
 * to ensure links are clickable and functional
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  console.log('=== COMPLETE MENU REPLACEMENT INITIALIZING ===');

  // Wait short moment to ensure DOM is ready
  setTimeout(function() {
    // Find the original menu elements
    const originalMobileMenu = document.querySelector('.mobile-menu');
    const navbarMobileToggle = document.querySelector('.navbar-mobile-toggle');
    
    if (!originalMobileMenu) {
      console.error('Mobile menu not found');
      return;
    }
    
    // Create backup of original menu data (hrefs and text)
    const menuData = [];
    const originalLinks = originalMobileMenu.querySelectorAll('.mobile-nav-link');
    originalLinks.forEach(link => {
      menuData.push({
        href: link.getAttribute('href'),
        text: link.querySelector('.link-text')?.textContent || 'Link',
        icon: link.querySelector('.link-icon')?.innerHTML || '<i class="fas fa-arrow-right"></i>'
      });
    });
    
    console.log('Gathered data for', menuData.length, 'menu items');
    
    // Hide the original mobile menu
    if (originalMobileMenu) {
      originalMobileMenu.style.display = 'none';
      originalMobileMenu.classList.add('disabled-menu');
    }
    
    // Create our new mobile menu structure
    const newMenu = document.createElement('div');
    newMenu.className = 'new-mobile-menu';
    newMenu.setAttribute('id', 'new-mobile-menu');
    newMenu.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(55, 48, 163, 0.95);
      z-index: 10000;
      display: none;
      flex-direction: column;
      padding: 20px;
      backdrop-filter: blur(10px);
    `;
    
    // Create menu header
    const menuHeader = document.createElement('div');
    menuHeader.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 10px;
    `;
    
    // Add logo to header
    const logoContainer = document.createElement('div');
    logoContainer.innerHTML = '<img src="images/logo/amira-logo.webp" alt="Amira Rahim" style="height: 40px;">';
    menuHeader.appendChild(logoContainer);
    
    // Add close button to header
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.cssText = `
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 1.5rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    menuHeader.appendChild(closeButton);
    newMenu.appendChild(menuHeader);
    
    // Create links container
    const linksContainer = document.createElement('nav');
    linksContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    `;
    
    // Add menu links
    menuData.forEach((item, index) => {
      const link = document.createElement('a');
      link.href = item.href;
      link.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        margin-bottom: 8px;
        transition: transform 0.3s ease, background 0.3s ease;
        cursor: pointer;
      `;
      
      link.innerHTML = `
        <span style="font-weight: 500;">${item.text}</span>
        <span style="opacity: 0.8;">${item.icon}</span>
      `;
      
      // Add direct click handler
      link.addEventListener('click', function(e) {
        console.log(`Link clicked: ${item.href}`);
        
        // Close menu
        newMenu.style.display = 'none';
        document.body.style.overflow = '';
        
        // Handle navigation based on href
        if (item.href.startsWith('#')) {
          e.preventDefault();
          
          // Scroll to the element
          const targetElement = document.querySelector(item.href);
          if (targetElement) {
            setTimeout(() => {
              window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
              });
            }, 100);
          } else {
            window.location.hash = item.href.substring(1);
          }
        }
      });
      
      linksContainer.appendChild(link);
    });
    
    newMenu.appendChild(linksContainer);
    
    // Add to document
    document.body.appendChild(newMenu);
    
    // Setup toggle button handler
    if (navbarMobileToggle) {
      // Remove existing handlers
      const newToggle = navbarMobileToggle.cloneNode(true);
      if (navbarMobileToggle.parentNode) {
        navbarMobileToggle.parentNode.replaceChild(newToggle, navbarMobileToggle);
      }
      
      // Add our handler
      newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        newMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        return false;
      });
    }
    
    // Close button handler
    closeButton.addEventListener('click', function() {
      newMenu.style.display = 'none';
      document.body.style.overflow = ''; // Restore body scroll
    });
    
    // Close on click outside
    document.addEventListener('click', function(e) {
      if (newMenu.style.display === 'flex' && !newMenu.contains(e.target) && !navbarMobileToggle.contains(e.target)) {
        newMenu.style.display = 'none';
        document.body.style.overflow = ''; // Restore body scroll
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && newMenu.style.display === 'flex') {
        newMenu.style.display = 'none';
        document.body.style.overflow = ''; // Restore body scroll
      }
    });
    
    console.log('=== MENU REPLACEMENT COMPLETE ===');
  }, 500);
});
