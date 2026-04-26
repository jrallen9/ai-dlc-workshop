// Display workshop number from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const workshopNum = urlParams.get('workshop');
if (workshopNum) {
    document.getElementById('workshop-number').textContent = `Workshop ${workshopNum}: `;
}

function copyPrompt(promptId, event) {
    const promptElement = document.getElementById(`prompt-${promptId}`);
    const textToCopy = promptElement.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const button = event.target.closest('button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check-circle"></i> Copied!';
        button.classList.add('btn-success');
        button.classList.remove('btn-light');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('btn-success');
            button.classList.add('btn-light');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy prompt. Please try again.');
    });
}
