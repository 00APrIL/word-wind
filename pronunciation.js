// pronunciation.js

document.addEventListener('DOMContentLoaded', function() {
    const pronounceButton = document.getElementById('pronounceButton');
    const wordElement = document.getElementById('map0');

    pronounceButton.addEventListener('click', function() {
        const word = wordElement.textContent.trim();
        if (word) {
            speak(word);
        }
    });

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set language to English
            utterance.rate = 0.8; // Slightly slower speed
            speechSynthesis.speak(utterance);
        } else {
            console.log('Text-to-speech not supported in this browser.');
        }
    }

    // Automatically pronounce the word when it changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const newWord = wordElement.textContent.trim();
                if (newWord) {
                    speak(newWord);
                }
            }
        });
    });

    observer.observe(wordElement, { childList: true });
});
