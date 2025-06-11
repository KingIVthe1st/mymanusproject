// Fix Commission Art button to link to collaborate section
document.addEventListener('DOMContentLoaded', function() {
    // Find all Commission Art buttons and update their href to point to collaborate section
    const commissionButtons = document.querySelectorAll('a.btn');
    
    commissionButtons.forEach(button => {
        if (button.textContent.trim() === 'Commission Art' && button.href.includes('#contact')) {
            button.href = '#collaborate';
            console.log('Updated Commission Art button to link to #collaborate');
        }
    });
});
