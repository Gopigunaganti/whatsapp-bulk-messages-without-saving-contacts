document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const charCount = document.querySelector('.char-count');
    const previewMessage = document.querySelector('.preview-message p');
    const progressBar = document.querySelector('.progress');
    const statusMessage = document.querySelector('.status-message');

    // Handle file input
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            statusMessage.textContent = `File selected: ${file.name}`;
            updateSendButton();
        }
    });

    // Handle message input
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCount.textContent = `${length}/1000 characters`;
        previewMessage.textContent = messageInput.value || 'Message preview will appear here';
        updateSendButton();
    });

    // Update send button state
    function updateSendButton() {
        const hasFile = fileInput.files.length > 0;
        const hasMessage = messageInput.value.trim().length > 0;
        sendBtn.disabled = !(hasFile && hasMessage);
    }

    // Handle send button click
    sendBtn.addEventListener('click', async () => {
        if (sendBtn.disabled) return;

        sendBtn.disabled = true;
        statusMessage.textContent = 'Sending messages...';
        progressBar.style.width = '0%';

        // Simulate sending progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                statusMessage.textContent = 'Messages sent successfully!';
                sendBtn.disabled = false;
                
                // Reset after 3 seconds
                setTimeout(() => {
                    statusMessage.textContent = 'Ready to send messages';
                    progressBar.style.width = '0%';
                }, 3000);
            }
        }, 500);
    });

    // Initialize
    updateSendButton();
}); 