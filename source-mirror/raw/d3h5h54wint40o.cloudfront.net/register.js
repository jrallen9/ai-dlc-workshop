// Get API endpoint from environment or use placeholder
const API_ENDPOINT = 'https://u6rfl737h5.execute-api.us-west-2.amazonaws.com/prod/submit';

// Show/hide "Other" text box
document.getElementById('interestOther').addEventListener('change', (e) => {
    const otherBox = document.getElementById('otherInterestBox');
    if (e.target.checked) {
        otherBox.classList.remove('d-none');
    } else {
        otherBox.classList.add('d-none');
        document.getElementById('otherInterestText').value = '';
    }
});

document.getElementById('interestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous messages
    document.getElementById('successMessage').classList.add('d-none');
    document.getElementById('errorMessage').classList.add('d-none');
    document.getElementById('interestError').classList.add('d-none');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const accountName = document.getElementById('accountName').value.trim();
    const saContact = document.getElementById('saContact').value.trim();
    const amContact = document.getElementById('amContact').value.trim();
    
    // Get selected interests
    const interests = [];
    if (document.getElementById('interestWorkshop').checked) interests.push('workshop');
    if (document.getElementById('interestDeepDive').checked) interests.push('deep-dive');
    if (document.getElementById('interestOther').checked) {
        const otherText = document.getElementById('otherInterestText').value.trim();
        interests.push(otherText ? `other: ${otherText}` : 'other');
    }
    
    // Validate at least one interest selected
    if (interests.length === 0) {
        document.getElementById('interestError').classList.remove('d-none');
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    submitBtn.disabled = true;
    submitText.classList.add('d-none');
    submitSpinner.classList.remove('d-none');
    
    try {
        const payload = {
            name,
            email,
            interests,
            timestamp: new Date().toISOString()
        };
        
        // Add optional fields if provided
        if (contact) payload.contact = contact;
        if (accountName) payload.accountName = accountName;
        if (saContact) payload.saContact = saContact;
        if (amContact) payload.amContact = amContact;
        
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit');
        }
        
        // Show success message
        document.getElementById('successMessage').classList.remove('d-none');
        
        // Reset form
        document.getElementById('interestForm').reset();
        document.getElementById('otherInterestBox').classList.add('d-none');
        
        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorText').textContent = 'Something went wrong. Please try again.';
        document.getElementById('errorMessage').classList.remove('d-none');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.classList.remove('d-none');
        submitSpinner.classList.add('d-none');
    }
});
