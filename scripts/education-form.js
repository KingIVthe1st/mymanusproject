document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('applicationForm');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(applicationForm);
            const formValues = Object.fromEntries(formData.entries());
            
            try {
                // Show loading state
                const submitButton = applicationForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
                
                // Here you would typically send the data to your server
                // For now, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-4 p-4 bg-green-50 text-green-800 rounded-lg text-center';
                successMessage.innerHTML = `
                    <div class="flex items-center justify-center">
                        <i class="fas fa-check-circle text-green-500 text-xl mr-2"></i>
                        <span class="font-medium">Application Submitted Successfully!</span>
                    </div>
                    <p class="mt-2 text-sm">Thank you for your interest in Better Than Art School. We'll be in touch soon!</p>
                `;
                
                // Insert success message after the form
                applicationForm.parentNode.insertBefore(successMessage, applicationForm.nextSibling);
                
                // Reset form
                applicationForm.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset button state after a delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, 2000);
                
                // Remove success message after 10 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => successMessage.remove(), 300);
                }, 10000);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'mt-4 p-4 bg-red-50 text-red-800 rounded-lg text-center';
                errorMessage.innerHTML = `
                    <div class="flex items-center justify-center">
                        <i class="fas fa-exclamation-circle text-red-500 text-xl mr-2"></i>
                        <span class="font-medium">Error Submitting Application</span>
                    </div>
                    <p class="mt-2 text-sm">Please try again or contact support if the problem persists.</p>
                `;
                
                // Insert error message after the form
                applicationForm.parentNode.insertBefore(errorMessage, applicationForm.nextSibling);
                
                // Reset button state
                const submitButton = applicationForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Application <i class="fas fa-paper-plane ml-2"></i>';
                
                // Remove error message after 10 seconds
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => errorMessage.remove(), 300);
                }, 10000);
            }
        });
    }
});
