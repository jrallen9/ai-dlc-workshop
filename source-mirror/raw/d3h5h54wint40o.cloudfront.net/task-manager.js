// Display workshop number from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const workshopNum = urlParams.get('workshop');
if (workshopNum) {
    document.getElementById('workshop-number').textContent = `Workshop ${workshopNum}: `;
}

function copyPrompt(index, event) {
    const promptElement = document.getElementById(`prompt-${index}`);
    const content = promptElement.textContent;
    
    navigator.clipboard.writeText(content).then(() => {
        const btn = event.target.closest('button');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check"></i> Copied!';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-light');
        
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-light');
        }, 2000);
    });
}
