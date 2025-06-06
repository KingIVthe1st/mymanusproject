document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabIndicator = document.querySelector('.tab-indicator');
    const tabNavContainer = document.querySelector('.tab-nav-container');
    
    // Set initial active tab
    let activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab && tabButtons.length > 0) {
        activeTab = tabButtons[0];
        activeTab.classList.add('active');
    }
    
    // Initialize the first panel as active if none is active
    const activePanel = document.querySelector('.tab-panel.active');
    if (!activePanel && tabPanels.length > 0) {
        tabPanels[0].classList.add('active');
    }
    
    // Initial update of tab indicator
    updateTabIndicator(activeTab);
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Don't do anything if this tab is already active
            if (this.classList.contains('active')) return;
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Update tab indicator
            updateTabIndicator(this);
            
            // Dispatch custom event for any additional functionality
            const event = new CustomEvent('tabChanged', {
                detail: {
                    tabId: tabId,
                    button: this
                }
            });
            document.dispatchEvent(event);
        });
    });
    
    // Update tab indicator position and width
    function updateTabIndicator(activeButton) {
        if (!tabIndicator || !activeButton) return;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = tabNavContainer.getBoundingClientRect();
        
        // Calculate position relative to container
        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;
        
        // Apply styles to indicator with smooth transition
        tabIndicator.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        tabIndicator.style.width = `${width}px`;
        tabIndicator.style.transform = `translateX(${left}px)`;
        
        // Set gradient based on active tab
        const tabId = activeButton.getAttribute('data-tab');
        if (tabId === 'btas-tab') {
            tabIndicator.style.background = 'linear-gradient(135deg, #3b82f6, #6366f1)';
        } else if (tabId === 'apply-tab') {
            tabIndicator.style.background = 'linear-gradient(135deg, #8b5cf6, #d946ef)';
        } else if (tabId === 'color-tab') {
            tabIndicator.style.background = 'linear-gradient(135deg, #f59e0b, #f97316)';
        }
    }
    
    // Handle window resize with debounce
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const activeButton = document.querySelector('.tab-btn.active');
            if (activeButton) {
                updateTabIndicator(activeButton);
            }
        }, 150);
    }
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    // Clean up event listeners when the component is destroyed
    return () => {
        window.removeEventListener('resize', handleResize);
    };
});
