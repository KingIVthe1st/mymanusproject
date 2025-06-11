// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the cite element containing the podcast text
    const citeElement = document.querySelector('cite.text-purple-600');
    
    // Remove the element if found
    if (citeElement) {
        citeElement.remove();
        console.log('Successfully removed the podcast text');
    } else {
        console.log('Could not find the podcast text element');
    }
});
