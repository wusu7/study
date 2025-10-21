document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const exerciseContents = document.querySelectorAll('.exercise-content');
    const welcomeHeader = document.querySelector('header');
    const brandLink = document.querySelector('.navbar-brand');
    const saveMemoButtons = document.querySelectorAll('.save-memo');
    const memoTextareas = document.querySelectorAll('textarea[id^="memo-"]');

    // Function to hide all exercise content
    function hideAllExerciseContent() {
        exerciseContents.forEach(content => {
            content.classList.add('d-none');
        });
    }

    // Show welcome message and hide all exercise content by default
    function showWelcomeMessage() {
        hideAllExerciseContent();
        welcomeHeader.classList.remove('d-none');
    }

    // Initial state
    showWelcomeMessage();

    // Event listener for dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId);

            // Hide welcome message and all exercise content
            welcomeHeader.classList.add('d-none');
            hideAllExerciseContent();

            // Show the target exercise content
            if (targetContent) {
                targetContent.classList.remove('d-none');
            }
        });
    });

    // Event listener for the brand link to show the welcome message again
    brandLink.addEventListener('click', function(event) {
        event.preventDefault();
        showWelcomeMessage();
    });

    // --- Memo Functionality ---

    // Load memos from localStorage
    function loadMemos() {
        memoTextareas.forEach(textarea => {
            const memoId = textarea.id;
            const savedMemo = localStorage.getItem(memoId);
            if (savedMemo) {
                textarea.value = savedMemo;
            }
        });
    }

    // Save memo to localStorage
    saveMemoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memoId = this.getAttribute('data-memo-id');
            const textarea = document.getElementById(memoId);
            if (textarea) {
                localStorage.setItem(memoId, textarea.value);
                alert('메모가 저장되었습니다!');
            }
        });
    });

    // Load memos when the page loads
    loadMemos();

    // --- Chatbot Functionality ---
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('d-none');
    });

    // Handle chat form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, 'user');
        chatInput.value = '';

        try {
            // Add a loading indicator
            const loadingIndicator = addMessage('상담 중...', 'bot');

            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage })
            });

            // Remove the loading indicator
            loadingIndicator.remove();

            if (!response.ok) {
                throw new Error('서버에서 응답을 받지 못했습니다.');
            }

            const data = await response.json();
            addMessage(data.reply, 'bot');

        } catch (error) {
            console.error('Chat Error:', error);
            addMessage('죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
        }
    });

    function addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', type);
        
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.textContent = message;
        
        messageElement.appendChild(bubble);
        chatMessages.appendChild(messageElement);

        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageElement;
    }
});